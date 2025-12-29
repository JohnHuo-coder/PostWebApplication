import { supabaseClient } from "../config/setup.ts";
import dotenv from 'dotenv';
import { createClient } from "@supabase/supabase-js"; 
dotenv.config()

function getSupabaseClientWithToken(accessToken){
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        },
        global:{
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        }
    })
}

function serializePost(post) {
  const base = {
    id: post.id,
    title: post.title,
    created_at: post.created_at,
  };

  if (!post.show_info) {
    return {
      ...base,
      user_public_info: {
        id: null,
        avatar_path: null,
        username: null,
        university_name: post.user_public_info.university_name,
        school: post.user_public_info.school,
        major: post.user_public_info.major,
        graduation_year: post.user_public_info.graduation_year,
        },
    };
  }

  return {
    ...base,
    user_public_info: {
        id: post.user_public_info.id,
        avatar_path: post.user_public_info.avatar_path,
        username: post.user_public_info.username,
        university_name: post.user_public_info.university_name,
        school: post.user_public_info.school,
        major: post.user_public_info.major,
        graduation_year: post.user_public_info.graduation_year,
        },
    };
}


export const getAllPosts = async(req, res) => {
    try{
        const {data, error} = await supabaseClient
        .from("posts")
        .select(`
            id,
            title,
            show_info,
            created_at,
            user_public_info (
                id,
                avatar_path,
                username,
                university_name,
                school,
                major,
                graduation_year
            )
        `)
        .order("created_at", { ascending: false });
        if (error){
            return res.status(400).json({error: error.message})
        }
        const result = data.map(serializePost)
        res.status(200).json(result)
    }catch(e){
        res.status(500).json({ error: e.message });
    };
};

export const getPostDetail = async(req, res) => {
    const id = req.params.id
    try{
        const {data, error} = await supabaseClient
        .from("posts")
        .select(`
            id,
            title,
            show_info,
            created_at,
            tasks (
                task_name,
                duration,
                description
            )
        `)
        .eq("id", id)
        .single()
        if (error){
            return res.status(400).json({error: error.message})
        }
        res.status(200).json(data)
    }catch(e){
        res.status(500).json({ error: e.message });
    };
};


export const postNewPost = async(req, res) => {
    const authorUid = req.user.id;
    const authorId = req.profileId
    const {title, tasks, showInfo} = req.body;
    const accessToken = req.accessToken;
    const supabaseUserClient = getSupabaseClientWithToken(accessToken);
    if (req.onboardStatus !== "completed"){
        return res.status(403).json({error: "Onboarding not complete"})
    }
    if (tasks.length === 0){
        return res.status(400).json({error: "Please post at least one task"})
    }
    try{
        const {data: post, error: postError} = await supabaseUserClient
        .from("posts")
        .insert([{author_uid: authorUid, title: title, show_info: showInfo, author_id: authorId}])
        .select()
        .single()
        if (postError) {
            console.error("Insert post error:", postError);
            return res.status(403).json({ error: "Post insert failed" });
        }
        const tasksToInsert = tasks.map((task) => ({
            post_id: post.id,
            task_name: task.title,
            description: task.description,
            duration: task.duration
        }))
        const { error: tasksError } = await supabaseUserClient
        .from("tasks")
        .insert(tasksToInsert);

        if (tasksError) {
            console.error("Insert tasks error:", tasksError);
            return res.status(403).json({ error: "Tasks insert failed" });
        }
        res.status(200).json(post);
    }catch(e){
        console.error('Controller Catch Error:', e);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const searchPosts = async (req, res) => {
    const { keyword } = req.query;
    if (!keyword || keyword.trim() === "") {
        return res.status(400).json({ error: "Keyword is required" });
    }
    const trimmed = keyword.trim()
    try{
        const {data, error} = await supabaseClient.rpc('search_posts', { q: trimmed })
        if (error){
            return res.status(400).json({error: error.message})
        }
        res.status(200).json(data);
    }catch(e){
        res.status(500).json({ error: e.message });
    };
}