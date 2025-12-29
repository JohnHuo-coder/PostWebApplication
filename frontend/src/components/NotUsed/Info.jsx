import {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";


export default function Info(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [age, setAge] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation()
    const API_URL = import.meta.env.VITE_API_URL;

    const { user, onboardStatus, loading } = useAuth();
    useEffect(() => {
        if (!loading && !user){
            navigate('/login', { replace: true, state: {from: location.pathname} });
        }
        if (!loading && user && onboardStatus === "need_public" ) {
            console.log("Need Onboarding. Redirecting...");
            navigate('/onboard', { replace: true });
        }
    }, [user, loading, onboardStatus]);

    const updateProfile = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("age", age);
        formData.append("bio", bio);
        if (avatar) {
            formData.append("avatar", avatar);
        }

    try{
        const res = await fetch(`${API_URL}/api/myprofile/edit/personal`,{
            method: "PUT", 
            credentials: "include",
            body: formData
        });
        const updatedProfile = await res.json();
        if (!res.ok){
            setError(updatedProfile.error || "update profile failed");
            return;
        }
        console.log("update successfully", updatedProfile);
        navigate("/myprofile", { replace: true });
    }catch(e){
        setError("Network error. Please try again later.");
    }
    };


    return(
        <main className="login-main">
            <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                <form onSubmit={updateProfile} className="form-card tasks-form">
                    <h4 className="form-section-title">Personal Information</h4>
                    <p className="text-muted mb-0">
                        This information won't be visible to other users. 
                        You can choose to share along with your posts for others to better know about you
                    </p>
                    {error ? <p style={{ color: "red" }}>{error}</p> : null}
                    <div className="p-3">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Your first name"
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Your last name"
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Your age"
                                    value={age} 
                                    min = "15"
                                    max = "30"
                                    onChange={(e) => setAge(Number(e.target.value))}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Avatar</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => setAvatar(e.target.files[0])}
                                />
                            </div>

                        </div>

                        <div className="mt-3">
                            <label className="form-label">Bio</label>
                            <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Say something about yourself"
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" style={{alignSelf: "center"}} disabled={!firstName.trim() && !lastName.trim() && !age.trim() && !bio.trim()}>confirm</button>
                </form>
            </div>
        </main>
    )
}