import { supabaseAdmin } from "../config/setup.ts"; 
import dotenv from 'dotenv';
import { createClient } from "@supabase/supabase-js"; 
dotenv.config()

function getSupabaseClientWithToken(accessToken) {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    auth: {
        autoRefreshToken: false, 
        persistSession: false,
     },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

function getExtensionFromMime(mime) {
  const map = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
  };
  return map[mime] || "bin";
}

function normalizeUsername(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, ""); 
}

export const getOnboardStatus = async (req, res) => {
    return res.status(200).json({onboardStatus: req.onboardStatus, avatarPath: req.avatarPath});
}

// export const skipPrivate = async (req, res) => {
//     const id = req.user.id;
//     const accessToken = req.cookies["my-access-token"];
//     const supabaseUserClient = getSupabaseClientWithToken(accessToken);
//     try{
//         const {data, error} = await supabaseUserClient.from("user_private_info")
//         .insert([{auth_id: id}])
//         .select()
//         .single()
//         if (error){
//             console.error('Update Profile RLS/DB Error:', error);
//             return res.status(403).json({error: "Update failed. Check your data or permissions."})
//         }
//         res.status(200).json(data);
//     }catch(e){
//         console.error('Controller Catch Error:', e);
//         res.status(500).json({error: "Internal Server Error"});
//     }
// }

// export const completePrivate = async (req, res) => {
//     const id = req.user.id;
//     const accessToken = req.cookies["my-access-token"];
//     const supabaseUserClient = getSupabaseClientWithToken(accessToken);
//     const { firstName, lastName, bio } = req.body;
//     const avatarImage = req.files?.avatar?.[0] || null;
//     const backgroundImage = req.files?.backgroundImage?.[0] || null;
//     let avatarUrl = null;
//     let backgroundUrl = null;

//     try{
//         if(avatarImage){
//             const ext = getExtensionFromMime(avatarImage.mimetype);
//             const avatarFilePath = `avatars/${id}.${ext}`;
//             const {error: avatarError} = await supabaseUserClient.storage
//             .from("avatars")
//             .upload(avatarFilePath, avatarImage.buffer, {
//                 upsert: true,
//                 contentType: avatarImage.mimetype
//             })
//             if (avatarError) {
//               return res.status(400).json({ error: "Avatar upload failed" });
//             };
//             const { data: avatarUrlData } = supabaseUserClient.storage.from("avatars").getPublicUrl(avatarFilePath);
//             avatarUrl = avatarUrlData.publicUrl;
//         }

//         if(backgroundImage){
//             const ext = getExtensionFromMime(backgroundImage.mimetype);
//             const bgFilePath = `background_images/${id}.${ext}`;
//             const {error: bgError} = await supabaseUserClient.storage
//             .from("background_images")
//             .upload(bgFilePath, backgroundImage.buffer, {
//                 upsert: true,
//                 contentType: backgroundImage.mimetype
//             })
//             if (bgError) {
//               return res.status(400).json({ error: "background Image upload failed" });
//             };
//             const { data: bgUrlData } = supabaseUserClient.storage.from("background_images").getPublicUrl(bgFilePath);
//             backgroundUrl = bgUrlData.publicUrl;
//         }

//         const {data, error} = await supabaseUserClient.from("user_private_info")
//         .upsert([{first_name:firstName, last_name: lastName, bio: bio, avatar_path: avatarUrl, auth_id: id, bgimage_path: backgroundUrl}])
//         .select()
//         .single()
//         if (error){
//             console.error('Update Profile RLS/DB Error:', error);
//             return res.status(403).json({error: "Update failed. Check your data or permissions."})
//         }
//         res.status(200).json(data);
//     }catch(e){
//         console.error('Controller Catch Error:', e);
//         res.status(500).json({error: "Internal Server Error"});
//     }
// }

// export const completePublic = async (req, res) => {
//     const { university, school, major, graduationYear } = req.body;
//     const id = req.user.id;
//     const accessToken = req.cookies["my-access-token"];
//     const supabaseUserClient = getSupabaseClientWithToken(accessToken);
//     try{
//         const {data, error} = await supabaseUserClient.from("user_public_info")
//         .insert([{university_name: university, school: school, major: major, graduation_year: graduationYear, auth_id: id}])
//         .select()
//         .single()
//         if (error){
//             console.error('Update Profile RLS/DB Error:', error);
//             return res.status(403).json({error: error.message || "Update failed. Check your data or permissions."})
//         }
//         res.status(200).json(data);
//     }catch(e){
//         console.error('Controller Catch Error:', e);
//         res.status(500).json({error: "Internal Server Error"});
//     }
// }


export const completePublic = async (req, res) => {
    const id = req.user.id;
    const accessToken = req.cookies["my-access-token"];
    const supabaseUserClient = getSupabaseClientWithToken(accessToken);
    const { username, university, school, major, graduationYear, bio } = req.body;
    const normalized = normalizeUsername(username);
    const avatarImage = req.files?.avatar?.[0] || null;
    const backgroundImage = req.files?.backgroundImage?.[0] || null;
    let avatarUrl = null;
    let backgroundUrl = null;

    try{
        if(avatarImage){
            const ext = getExtensionFromMime(avatarImage.mimetype);
            const avatarFilePath = `avatars/${id}.${ext}`;
            const {error: avatarError} = await supabaseUserClient.storage
            .from("avatars")
            .upload(avatarFilePath, avatarImage.buffer, {
                upsert: true,
                contentType: avatarImage.mimetype
            })
            if (avatarError) {
              return res.status(400).json({ error: "Avatar upload failed" });
            };
            const { data: avatarUrlData } = supabaseUserClient.storage.from("avatars").getPublicUrl(avatarFilePath);
            avatarUrl = avatarUrlData.publicUrl;
        }

        if(backgroundImage){
            const ext = getExtensionFromMime(backgroundImage.mimetype);
            const bgFilePath = `background_images/${id}.${ext}`;
            const {error: bgError} = await supabaseUserClient.storage
            .from("background_images")
            .upload(bgFilePath, backgroundImage.buffer, {
                upsert: true,
                contentType: backgroundImage.mimetype
            })
            if (bgError) {
              return res.status(400).json({ error: "background Image upload failed" });
            };
            const { data: bgUrlData } = supabaseUserClient.storage.from("background_images").getPublicUrl(bgFilePath);
            backgroundUrl = bgUrlData.publicUrl;
        }

        const {data, error} = await supabaseUserClient.from("user_public_info")
        .upsert([{username: username, university_name: university, school: school, major: major, graduation_year: graduationYear, bio: bio, avatar_path: avatarUrl, auth_id: id, bgimage_path: backgroundUrl, normalized_username: normalized}])
        .select()
        .single()
        if (error){
            console.error('Update Profile RLS/DB Error:', error);
            return res.status(400).json({error: error.message})
        }
        res.status(200).json(data);
    }catch(e){
        console.error('Controller Catch Error:', e);
        res.status(500).json({error: "Internal Server Error"});
    }
}