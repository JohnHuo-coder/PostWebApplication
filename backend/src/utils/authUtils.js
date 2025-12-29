import { supabaseAdmin } from "../config/setup.ts"; 
export async function verifyUserToken(accessToken){
    try {
        const { data, error } = await supabaseAdmin.auth.getUser(accessToken);

        if (error || !data.user) {
            console.error("Token verification failed:", error?.message);
            return null;
        }
        return data.user;

    } catch (e) {
        console.error("Unexpected error during token verification:", e);
        return null;
    }
}