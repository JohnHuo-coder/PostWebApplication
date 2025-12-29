import { useState, useEffect, useContext, createContext } from "react";

export const UserContext = createContext({
    user: null,
    avatar: "",
    onboardStatus: "",
    loading: true,
    logOut: () => {},
    refreshAuth: () => {} 
});


export const useAuth = () => useContext(UserContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [onboardStatus, setOnboardStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    const checkOnboardStatus = async () => {
        try {
            const res = await fetch(`${API_URL}/api/onboard/checkonboard`, {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                console.log("error onboard check")
                return "need_public"; 
            }

            const data = await res.json();
            setAvatar(data.avatarPath);
            console.log(data.avatarPath)
            return data.onboardStatus;
        } catch (e) {
            console.error("onboard check failed:", e);
            return "need_public"; 
        }
    };


    const checkInitialUser = async () => {
        setLoading(true);

        try {
            const meRes = await fetch(`${API_URL}/api/auth/me`, {
                method: "GET",
                credentials: "include",
            });

            if (!meRes.ok) {
                setUser(null);
                setOnboardStatus("need_public");
                return;
            }

            const currentUser = await meRes.json();
            setUser(currentUser);

            const st = await checkOnboardStatus();
            console.log(st)
            setOnboardStatus(st);

        } catch (error) {
            console.error("Initial auth check failed:", error);
            setUser(null);
            setOnboardStatus("need_public");
        } finally {
            setLoading(false);
        }
    };

    const refreshAuth = () => {
        checkInitialUser();
    };

    useEffect(() => {
        checkInitialUser();
    }, []); 

    const logOut = async () => {
        
        try {
            const res = await fetch(`${API_URL}/api/auth/logout`, {
                method: "GET",
                credentials: "include"
            });

            if (res.ok) {
                console.log("Backend cookies cleared successfully. Refreshing auth state...");
            } else {
                console.error("Logout API failed, forcing refresh:", res.status);
            }
        } catch (error) {
            console.error("Network error during logout:", error);
        }
        refreshAuth();
    }

    const contextValue = {
        user,
        avatar,
        onboardStatus,
        loading,
        refreshAuth,
        logOut
    };
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}