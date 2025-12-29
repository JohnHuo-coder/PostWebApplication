import {useState, useEffect, useRef} from "react";
import { useAuth } from "./AuthContext";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import bgimage from "../assets/marco-grosso-AP6a3tBJD70-unsplash.jpg"

export default function PublicForm(){
    const [university, setUniversity] = useState("");
    const [school, setSchool] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [major, setMajor] = useState("");
    const [error, setError] = useState("");
	const defaultBg = 'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
	
	const [username, setUsername] = useState("");
	const [bio, setBio] = useState("");
	const [avatar, setAvatar] = useState(null);
	const [backgroundImage, setBackgroundImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [coverPreview, setCoverPreview] = useState(defaultBg);
	const fileInputRef = useRef(null);
    
	const API_URL = import.meta.env.VITE_API_URL;
    const { refreshAuth } = useAuth();

	const completePublic = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
		formData.append("university", university);
		formData.append("school", school);
		formData.append("major", major);
		formData.append("graduationYear", Number(graduationYear));
        formData.append("bio", bio);
        formData.append("avatar", avatar);
		formData.append("backgroundImage", backgroundImage);

		try{
			const res = await fetch(`${API_URL}/api/onboard/completepublic`,{
				method: "POST", 
				credentials: "include",
				body: formData
			});
			const updatedProfile = await res.json();
			if (!res.ok){
				setError(updatedProfile.error || "update profile failed");
				return;
			}
			console.log("complete private profile successfully", updatedProfile);
			refreshAuth();
		}catch(e){
			setError("Network error. Please try again later.");
		}
    };

    // const completePublic = async(e)=>{
    //     e.preventDefault();
    //     try{
    //         const res = await fetch(`${API_URL}/api/onboard/completepublic`,{
    //         method: "POST", 
    //         headers: {'Content-Type': 'application/json'},
    //         credentials: "include",
    //         body: JSON.stringify({
    //             university: university,
    //             school: school,
    //             major: major,
    //             graduationYear: Number(graduationYear)
    //         })});
    //     const updatedProfile = await res.json();
    //     if (!res.ok){
    //         setError(updatedProfile.error || "update profile failed");
    //         return;
    //     }
    //     console.log("complete public profile successfully", updatedProfile);
    //     refreshAuth();
    //     }catch(e){
    //         setError("Network error. Please try again later.");
    //     }
    // };

    return (
		<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white dark:bg-slate-600" style={{ backgroundImage: `url(${bgimage})` }}>
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-4xl">
				<div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/90 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
					<form onSubmit={completePublic}>
						<div className="space-y-12">
							<div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
								<h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Complete Public Profile</h2>
								<p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
									This information helps others to better know you.
									This information will be visible to the public, only the major and graduation year fields are required.
								</p>

								<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="sm:col-span-4">
										<label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
											Username
										</label>
										<div className="mt-2">
											<input
											id="username"
											type="text"
											value={username} 
											onChange={(e) => setUsername(e.target.value)}
											className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
											/>
										</div>
									</div>

									<div className="sm:col-span-3">
										<label htmlFor="universityname" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
											University Name
										</label>
										<div className="mt-2">
											<input
												id="universityname"
												type="text"
												value={university} 
												onChange={(e) => setUniversity(e.target.value)}
												className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
											/>
										</div>
									</div>

									<div className="sm:col-span-3">
										<label htmlFor="schoolname" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
											School Name
										</label>
										<div className="mt-2">
											<input
												id="schoolname"
												type="text"
												value={school} 
												onChange={(e) => setSchool(e.target.value)}
												className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
											/>
										</div>
									</div>

									<div className="sm:col-span-3">
										<label htmlFor="major" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
											Major
										</label>
										<div className="mt-2">
											<input
												id="major"
												type="text"
												value={major} 
												onChange={(e) => setMajor(e.target.value)}
												required
												className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
											/>
										</div>
									</div>

									<div className="sm:col-span-3">
										<label htmlFor="graduationyear" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
											Graduation Year
										</label>
										<div className="mt-2">
											<input
												id="graduationyear"
												type="number"
												min="2020"
												max="2030"
												value={graduationYear} 
												onChange={(e) => setGraduationYear(e.target.value)}
												required
												className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
											/>
										</div>
									</div>

									<div className="col-span-full">
										<label htmlFor="about" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
											About
										</label>
										<div className="mt-2">
											<textarea
											id="about"
											rows={3}
											value={bio} 
											onChange={(e) => setBio(e.target.value)}
											className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
											/>
										</div>
										<p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">Write a few sentences about yourself.</p>
									</div>

									<div className="col-span-full">
										<label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
											Photo
										</label>
										<div className="mt-2 flex items-center gap-x-3">
											{preview ? (
												<img
													src={preview}
													className="size-12 rounded-full object-cover"
												/>
												) : (
												<UserCircleIcon aria-hidden="true" className="size-12 text-gray-300 dark:text-gray-500" />
												)}
											<input 
											className="hidden"
											type="file"
											accept="image/png,image/jpeg"
											ref={fileInputRef}
											onChange={(e) => {
												const file = e.target.files?.[0];
												if (!file) {
													return;
												}

												setAvatar(file);
												const url = URL.createObjectURL(file);
												setPreview(url);
											}}>
											</input>

											<button
											type="button"
											onClick={() => fileInputRef.current?.click()}
											className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
											>
											Change
											</button>

											<button
											type="button"
											onClick={() => {
												setPreview(null);
												setAvatar(null)}}
											className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
											>
											Use default avatar
											</button>
										</div>
									</div>

									<div className="col-span-full">
										<label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
											Cover photo
										</label>
										<div className="relative w-full h-32 lg:h-48 overflow-hidden rounded-lg">
											<img
												src={coverPreview}
												className="absolute inset-0 w-full h-full object-cover rounded-lg"
											/>

											<div className="absolute inset-0 bg-black/40 rounded-lg" />

											<div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
												<PhotoIcon className="size-12 text-white/80" />

												<label
												htmlFor="file-upload"
												className="mt-2 cursor-pointer rounded-md bg-white/80 px-3 py-1.5 text-sm font-semibold text-gray-900 hover:bg-white"
												>
												Change cover
												<input
													id="file-upload"
													type="file"
													accept="image/png,image/jpeg"
													className="sr-only"
													onChange={(e) => {
													const file = e.target.files?.[0];
													if (!file) return;

													setBackgroundImage(file);
													setCoverPreview(URL.createObjectURL(file));
													}}
												/>
												</label>

												<p className="mt-1 text-xs text-white/80">PNG, JPG up to 10MB</p>
											</div>
										</div>
										<button
											type="button"
											onClick={() => {
												setCoverPreview(defaultBg);
												setBackgroundImage(null)}}
											className="mt-5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
											>
											Use default background image
										</button>
									</div>
									
									{error ? <p style={{ color: "red" }}>{error}</p> : null}

								</div>
							</div>
						</div>
						
						<div className="mt-6 flex items-center justify-end gap-x-6">
							<button
								type="submit"
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
								disabled={!major.trim() || !graduationYear.trim()}
								>
								confirm
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
    )
}
