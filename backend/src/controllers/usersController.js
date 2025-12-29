import { supabaseClient } from '../config/setup.ts';
function normalizeUsername(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, ""); 
}


export const getAllUsers = async (req, res) => {
    try{
        const {data, error} = await supabaseClient.from("user_public_info").select("*")
        if (error){
            return res.status(400).json({error: error.message})
        }
        res.status(200).json(data);
    }catch(e){
        res.status(500).json({ error: e.message });
    };
}

export const getUserByName = async (req, res) => {
	const id = req.params.id;
	const { keyword } = req.query;
	if (!keyword || keyword.trim() === "") {
        return res.status(400).json({ error: "Username is required" });
    }
    const trimmed = keyword.trim();
	const normalized = normalizeUsername(trimmed);
	try{
		const {data, error} = await supabaseClient.from("user_public_info").select("*").like("normalized_username", `%${normalized}%`).limit(20);

		if (error){
			return res.status(400).json({error: error.message})
		}
		res.status(200).json(data);
	}catch(e){
		res.status(500).json({ error: e.message });
	};
}

export const getUserInfo = async (req, res) => {
	const id = req.params.id;
	try{
		const {data, error} = await supabaseClient
		.from("user_public_info")
		.select("*")
		.eq("id", id)
		.maybeSingle()
		if (error){ 
			return res.status(400).json({error: error.message})
		}
		res.status(200).json(data);
	}catch(e){
		return res.status(500).json({error: "Internal Server Error"});
	}
}

export const getUserPosts = async (req, res) => {
	const id = req.params.id;
	try{
		const {data, error} = await supabaseClient
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
		.eq("show_info", true)
		if (error){
			return res.status(400).json({error: error.message})
		}
		res.status(200).json(data);
	}catch(e){
		return res.status(500).json({error: "Internal Server Error"});
	}
}