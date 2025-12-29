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


// export const checkOnboardStatus = async (req, res, next) => {
//     const id = req.user.id;
//     const accessToken = req.cookies["my-access-token"];
//     const supabaseUserClient = getSupabaseClientWithToken(accessToken);

//     try{
//         const [publicRes, privateRes] = await Promise.all([
//             supabaseUserClient
//                 .from("user_public_info")
//                 .select("id")
//                 .eq("auth_id", id)
//                 .maybeSingle(),

//             supabaseUserClient
//                 .from("user_private_info")
//                 .select("id")
//                 .eq("auth_id", id)
//                 .maybeSingle()
//         ]);

//         if (publicRes.error) {
//             console.error("public info check failed:", publicRes.error);
//             return res.status(500).json({ error: "Public info check failed" });
//         }

//         if (privateRes.error) {
//             console.error("private info check failed:", privateRes.error);
//             return res.status(500).json({ error: "Private info check failed" });
//         }

//         const hasPublic = !!publicRes.data;
//         const hasPrivate = !!privateRes.data;
//         req.profileId = 
//         req.onboardStatus =
//             hasPublic && hasPrivate
//                 ? "completed"
//                 : hasPublic
//                 ? "need_private"
//                 : "need_public";

//         next();
//     }catch(e){
//         console.error('Check onboard status controller Catch Error:', e);
//         return res.status(500).json({error: "Internal Server Error"})
//     }
// };


export const checkOnboardStatus = async (req, res, next) => {

    const id = req.user.id;
    const accessToken = req.cookies["my-access-token"];
    const supabaseUserClient = getSupabaseClientWithToken(accessToken);

    try{
        const publicRes = await supabaseUserClient
            .from("user_public_info")
            .select("id, avatar_path")
            .eq("auth_id", id)
            .maybeSingle()

        if (publicRes.error) {
            console.error("public info check failed:", publicRes.error);
            return res.status(500).json({ error: "Public info check failed" });
        }

        const hasPublic = !!publicRes.data;
        req.profileId = publicRes.data.id;
        req.avatarPath = publicRes.data.avatar_path;
        req.onboardStatus = hasPublic ? "completed" : "need_public";

        next();
    }catch(e){
        console.error('Check onboard status controller Catch Error:', e);
        return res.status(500).json({error: "Internal Server Error"})
    }
};

export const checkOnboardPublic = async (req, res, next) => {
    const id = req.user.id;
    const accessToken = req.cookies["my-access-token"];
    const supabaseUserClient = getSupabaseClientWithToken(accessToken);

     try{
        const {data, error} = await supabaseUserClient
            .from("user_public_info")
            .select("*")
            .eq("auth_id", id)
            .maybeSingle();
        if (error){
            return res.status(401).json({error: "fail checking public info status: "})
        }
        if (data){
            return res.status(403).json({error: "Public information already exists, please edit it in your profile"})
        }
        next()
    }catch(e){
        console.error('Check onboard public controller Catch Error:', e);
        return res.status(500).json({error: "Internal Server Error"})
    }
};




// export const checkPublicBeforePrivate = async (req, res, next) => {
//     const id = req.user.id;
//     const accessToken = req.cookies["my-access-token"];
//     const supabaseUserClient = getSupabaseClientWithToken(accessToken);

//      try{
//         const {data, error} = await supabaseUserClient
//             .from("user_public_info")
//             .select("*")
//             .eq("auth_id", id)
//             .maybeSingle();
//         if (error){
//             return res.status(401).json({error: "fail checking public info before inserting private info: "})
//         }
//         if (!data){
//             return res.status(403).json({error: "public information not exists, please complete public information before move onto private information!"})
//         }
//         next()
//     }catch(e){
//         console.error('Check Public Before Private controller Catch Error:', e);
//         return res.status(500).json({error: "Internal Server Error"})
//     }
// };

// export const checkOnboardPrivate = async (req, res, next) => {
//     const id = req.user.id;
//     const accessToken = req.cookies["my-access-token"];
//     const supabaseUserClient = getSupabaseClientWithToken(accessToken);

//      try{
//         const {data, error} = await supabaseUserClient
//             .from("user_private_info")
//             .select("*")
//             .eq("auth_id", id)
//             .maybeSingle();
//         if (error){
//             return res.status(401).json({error: "fail checking private info status: "})
//         }
//         if (data){
//             return res.status(403).json({error: "private information already exists, please edit it in your profile"})
//         }
//         next()
//     }catch(e){
//         console.error('Check onboard private controller Catch Error:', e);
//         return res.status(500).json({error: "Internal Server Error"})
//     }
// };