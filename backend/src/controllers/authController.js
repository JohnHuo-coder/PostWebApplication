import { supabaseClient, supabaseAdmin } from "../config/setup.ts";

export const signUp = async (req, res) => {
    const { email, password} = req.body;
    try{
        const { data, error } = await supabaseClient.auth.signUp({email: email, password: password});
        if (error){
            console.error('Error creating user:', error);
            return res.status(400).json({ error: error.message });
        }
        const user = data.user;
        res.status(200).json(user);
    }catch(e){
        console.error('Controller Catch Error:', e);
        return res.status(500).json({error: "Internal Server Error"})
    }
}
  
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try{
        const {data, error} = await supabaseClient.auth.signInWithPassword({email, password})
        if (error) {
            return res.status(401).json({ error: "Invalid email or password" });
        };

        const emailConfirmed = data.user.confirmed_at;
        if (!emailConfirmed){
            return res.status(401).json({ error: "comfirm via email before login" });
        }

        res.cookie('my-access-token', data.session.access_token, {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        res.cookie('my-refresh-token', data.session.refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
        });
        return res.status(200).json(data.user);
    }catch(e){
        console.error('Controller Catch Error:', e);
        return res.status(500).json({error: "Internal Server Error"})
    }
};


export const getCurrentUser = (req, res) => {
    return res.status(200).json(req.user);
}

export const userLogOut = (req, res) => {
  res.clearCookie("my-access-token", {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  res.clearCookie("my-refresh-token", {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
