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


export const getMyProfile = async (req, res) => {
	const id = req.profileId;
	const uid = req.user.id;
	const accessToken = req.cookies["my-access-token"];
	const supabaseUserClient = getSupabaseClientWithToken(accessToken);
	if (req.onboardStatus !== "completed"){
		return res.status(403).json({error: "Onboarding not complete"})
	}
	try{
		const {data, error} = await supabaseUserClient
		.from("user_public_info")
		.select("*")
		.eq("id", id)
		.maybeSingle()
		if (error){ /* separate */
			return res.status(403).json({error: error.message || "Access Forbidden or Profile not found."})
		}
		res.status(200).json(data);
	}catch(e){
		return res.status(500).json({error: "Internal Server Error"});
	}
}

export const getMyPosts = async (req, res) => {
	const id = req.profileId;
	const uid = req.user.id;
	const accessToken = req.cookies["my-access-token"];
	const supabaseUserClient = getSupabaseClientWithToken(accessToken);
	if (req.onboardStatus !== "completed"){
		return res.status(403).json({error: "Onboarding not complete"})
	}
	try{
		const {data, error} = await supabaseUserClient
		.from("posts")
		.select(`
		*,
		tasks (
			task_name,
			description,
			duration
		)
		`)
		.eq("author_id", id)
		if (error){ /* separate */
			return res.status(403).json({error: error.message || "Access Forbidden or Profile not found."})
		}
		res.status(200).json(data);
	}catch(e){
		return res.status(500).json({error: "Internal Server Error"});
	}
}


export const deleteMyPost = async (req, res) => {
	const postId = req.params.id;
	const authorId = req.profileId
	const accessToken = req.cookies["my-access-token"];
	const supabaseUserClient = getSupabaseClientWithToken(accessToken);
	if (req.onboardStatus !== "completed"){
		return res.status(403).json({error: "Onboarding not complete"})
	}
	try{
		const {data, error} = await supabaseUserClient
		.from("posts")
		.delete()
		.eq("id", postId)
		.eq("author_id", authorId)
		.select()
		if (error){
			return res.status(403).json({error: error.message || "Access Forbidden or Profile not found."})
		}
		if (!data || data.length === 0) {
			return res.status(403).json({ error: "Not allowed or post not found" });
		}
		res.status(200).json(data);
	}catch(e){
		return res.status(500).json({error: e.message || "Internal Server Error"});
	}
}




export const editMyPublicProfile = async (req, res) => {
	const id = req.profileId
	console.log("profileId:", req.profileId);

	const accessToken = req.cookies["my-access-token"];
	const supabaseUserClient = getSupabaseClientWithToken(accessToken);
	console.log(req.body)
	const { username, university, school, major, graduationYear, bio, useDefaultAv, useDefaultBg } = req.body;
	const normalized = normalizeUsername(username);
	const avatarImage = req.files?.avatar?.[0] || null;
	const backgroundImage = req.files?.backgroundImage?.[0] || null;
	let avatarUrl = null;
	let backgroundUrl = null;

	if(req.onboardStatus !== "completed"){
        return res.status(403).json({error: "Onboarding not complete"})
    }

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
				console.error("Avatar upload error:", avatarError);
			  	return res.status(400).json({ error: avatarError.message });
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
			  	console.error("background Image upload error:", bgError);
			  	return res.status(400).json({ error: bgError.message });
			};
			const { data: bgUrlData } = supabaseUserClient.storage.from("background_images").getPublicUrl(bgFilePath);
			backgroundUrl = bgUrlData.publicUrl;
		}

		const updateData = {
			username: username,
			university_name: university,
			school: school,
			major: major,
			graduation_year: graduationYear,
			bio: bio,
			normalized_username: normalized,
		};

		if (avatarUrl || useDefaultAv === "true") {
			updateData.avatar_path = avatarUrl;
		}

		if (backgroundUrl || useDefaultBg === "true") {
			updateData.bgimage_path = backgroundUrl;
		}

		console.log(updateData)
		console.log(useDefaultAv)
		console.log(useDefaultBg)

		const {data, error} = await supabaseUserClient.from("user_public_info")
		.update(updateData)
		.eq("id", id)
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




// export const editMyProfile = async (req, res) => {
//     const id = req.user.id;
//     const { firstName, lastName, age, bio } = req.body;
//     const avatarFile = req.file
//     const accessToken = req.cookies["my-access-token"];
//     const supabaseUserClient = getSupabaseClientWithToken(accessToken);
//     if(req.onboardStatus !== "completed"){
//         return res.status(403).json({error: "Onboarding not complete"})
//     }

//     let avatarUrl = null;

//     try{
//         if (avatarFile) {
//             const filePath = `avatars/${id}.png`;
//             const { error: uploadError } = await supabaseUserClient.storage
//                 .from("avatars")
//                 .upload(filePath, avatarFile.buffer, {
//                   upsert: true,
//                   contentType: avatarFile.mimetype,
//                 });

//             if (uploadError) {
//               return res.status(400).json({ error: "Avatar upload failed" });
//             }

//             const { data: urlData } = supabaseUserClient.storage.from("avatars").getPublicUrl(filePath);
//             avatarUrl = urlData.publicUrl;
//         }

//         const {data, error} = await supabaseUserClient
//         .from("user_private_info")
//         .update({first_name: firstName, last_name: lastName, age: age, bio: bio, avatar_path: avatarUrl})
//         .eq("auth_id", id)
//         .select()
//         .single()
//         if (error){
//             console.error('Update Profile RLS/DB Error:', error);
//             return res.status(403).json({error: error.message})
//         }
//         res.status(200).json(data);
//     }catch(e){
//         console.error('Controller Catch Error:', e);
//         res.status(500).json({error: "Internal Server Error"});
//     }
// }
