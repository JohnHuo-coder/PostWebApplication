import { useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import ErrorPage from "./popOuts/ErrorPage"
 

export default function Discover(){
	const [profiles, setProfiles] = useState([]);
	const [inputName, setInputName] = useState("");
	const [error, setError] = useState("")
	const [errorStatus, setErrorStatus] = useState("")
	const [loading, setLoading] = useState(false);
	const API_URL = import.meta.env.VITE_API_URL;



    useEffect(() => {
		const getAllUsers= async() => {
			setLoading(true);
			try{
				const res = await fetch(`${API_URL}/api/users`);
				const data = await res.json();
				if (!res.ok){
					setError(data.error || 'fail fetching user');
					setErrorStatus(res.status)
				}
				setProfiles(data);
			}catch(e){
				setError("Network Error!");
				setErrorStatus(0);
			}finally{
				setLoading(false);
			}
		}
		getAllUsers();
    },[])

    // useEffect(() => {
	// 	if (!searchedName) return;
	// 	const getUserByID = async() => {
	// 		setLoading(true);
	// 		try{
	// 			const res = await fetch(`${API_URL}/api/users/${searchedID}`);
	// 			const data = await res.json();
	// 			if (!data || !data.id) {
	// 				alert("User not found!");
	// 				setProfiles([]); 
	// 				return;
	// 			}
	// 			setProfiles([data]);
	// 		}catch(e){
	// 			console.log(`error getting user with id: ${searchedID}`);
	// 		}finally{
	// 			setLoading(false);
	// 		}
	// 	}
	// 	getUserByID();
    // },[searchedName])

	const handleSearch = async(e) => {
		e.preventDefault()
		setLoading(true);
		const keyword = inputName.trim();
		console.log(keyword)
		if(!keyword || keyword === ""){
			setLoading(false);
			setError("Username is required")
			return
		}
		try{
			const res = await fetch(`${API_URL}/api/users/search?keyword=${encodeURIComponent(keyword)}`, {
				method: "GET",
				credentials: "include"
			});
			const data = await res.json();
			if (!res.ok){
				console.error("fail getting searched post", data.error);
				setError(data.error || "fail getting searched posts");
			}
			if (data.length === 0) {
				alert("User not found!");
				setProfiles([]); 
				return;
			};
			setProfiles(data);
		}catch(e){
			console.error("error getting users due to network error", e);
			setError("fail getting searched users due to Network Error, please try again later")
		}finally{
			setLoading(false);
		}
	}

	if (error) {    
			return (
				<ErrorPage type={errorStatus} message={error}/>
			)
		}

    // return (
    //     <main className="discover-main">
    //         {/* <div style={{marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
    //           <input style={{width: "50%", height: "2rem", padding: 5, backgroundColor: "white", color: 'black', borderRadius: "5px"}} type="text" placeholder="Enter user ID" value={inputID} onChange={(e) => setInputID(e.target.value)}/>
    //           <button style={{margin: 10, backgroundColor: "white", color: 'black'}} onClick={() => {setSearched(inputID)}}>Search</button>
    //         </div> */}
    //         <div className="d-flex justify-content-center mb-5" style={{ width: "100%" }}>
	// 			<form className="d-flex" role="search" style={{ width: "100%", maxWidth: "700px" }} onSubmit={(e) => {e.preventDefault(); setSearched(inputID)}}>
	// 				<input className="form-control me-2" type="search" aria-label="Search" placeholder="Enter user ID" value={inputID} onChange={(e) => setInputID(e.target.value)}/>
	// 				<button className="btn btn-primary" type="submit">Search</button>
	// 			</form>
    //         </div>
    //         <div className = "d-flex flex-wrap justify-content-center gap-5">
    //           {/* style={{width: "100%", gap: 50, display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center'}} */}
	// 			{profiles.map((profile) => {
	// 				return(
	// 				// <div key= {profile.id} className = 'Profile-card'>
	// 				//   <img src={profile.profile_picture} alt="no picture provided" />
	// 				//   <h3>{profile.first_name || "no first name provided"} {profile.last_name || "no last name provided"}</h3>
	// 				//   <span>{profile.email}</span>
	// 				//   <span>{profile.major || "not available"}</span>
	// 				//   <span>{profile.graduation_year || "not available"}</span>
	// 				//   <p>{profile.bio || "The user hasn't say anything"}</p>
	// 				//   <Link to={`/discover/${profile.id}`}>details</Link>
	// 				// </div>
	// 				<div className="card rounded-4" style={{width: "18rem"}} key= {profile.id}>
	// 					<img src={profile.profile_picture} className="card-img-top rounded-top-4" alt="no picture provided" />
	// 					<div className="card-body p-2">
	// 					<h5 className="card-title">{profile.first_name || "no first name provided"} {profile.last_name || "no last name provided"}</h5>
	// 					<p className="card-text">{profile.email}</p>
	// 					<p className="card-text">{profile.major || "not available"}</p>
	// 					<p className="card-text">{profile.graduation_year || "not available"}</p>
	// 					<p className="card-text">{profile.bio || "The user hasn't say anything"}</p>
	// 					<Link className="btn btn-primary" to={`/discover/${profile.id}`}>details</Link>
	// 					</div>
	// 				</div>
	// 				)
	// 			})}
    //         </div>
    //     </main> )

	return (
		
			
		<div className="bg-gray-900 py-16 sm:py-24 h-full w-full">
			<div className="mx-auto max-w-8xl px-6 py-6 sm:py-8 lg:px-8">
				<form onSubmit={handleSearch} className="h-full w-full">
					<div className="mx-auto flex max-w-md gap-x-4">
						<label htmlFor="keyword" className="sr-only">
							Enter username
						</label>
						<input
							id="keyword"
							type="search"
							placeholder="Enter username"
							value={inputName} 
							onChange={(e) => setInputName(e.target.value)}
							className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:focus:outline-indigo-500"
						/>
						<button
							type="submit"
							className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
						>
							Search
						</button>
					</div>
				</form>
				
				<div className="mx-auto mt-10 lg:mx-0 sm:mt-6 flex items-center justify-between w-full">
					<div>
						<h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Discover</h2>
						<p className="mt-2 text-lg/8 text-gray-300">Make new friends here!</p>
					</div>
				</div>
				<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{loading ? 
						<div className="col-span-full flex justify-center">
							<div className="flex items-center justify-center" >
								<svg className="size-15 animate-spin" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="15 47"/>
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="gray" strokeWidth="4" fill="none" strokeLinecap="round"/>
								</svg>
							</div>
						</div> : 
						<>
						{profiles.map((profile) => (
							<div key={profile.id} className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
								<div className="px-4 py-5 sm:p-5">
									<article className="flex max-w-xl flex-col items-start justify-between">
										
										<div className="relative mb-3 flex items-center gap-x-4 justify-self-end">
											{profile.avatar_path ? 
											<img alt="" src={profile.avatar_path} className="size-10 rounded-full bg-gray-800 ring-4 ring-white sm:size-15 dark:ring-gray-900 dark:outline dark:-outline-offset-1 dark:outline-white/10"/> 
											: <svg fill="currentcolor" viewBox="0 0 24 24" className="size-10 rounded-full text-gray-800 bg-gray-200 ring-4 ring-white sm:size-15 dark:text-white dark:bg-gray-800 dark:ring-gray-900 dark:outline dark:-outline-offset-1 dark:outline-white/10">
												<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
											</svg>}
											<div className="text-lg/6">
												<p className="font-semibold text-white">
												<Link to={`/discover/${profile.id}`}>
													<span className="absolute inset-0" />
													{profile.username ? profile.username : "No Name Provided"}
												</Link>
												</p>
											</div>
										</div>

										<div className="flex items-center gap-x-4 text-xs">
											{profile.university_name ? <a
												href="#"
												className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800"
											>
												{profile.university_name}
											</a> : null}

											{profile.school ? <a
												href="#"
												className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800"
											>
												{profile.school}
											</a> : null}

											<a
												href="#"
												className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800"
											>
												{profile.major}
											</a>
											
											<a
												href="#"
												className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800"
											>
												{profile.graduation_year}
											</a>
										</div>
										<div className="relative">
											<h3 className="mt-3 text-md/6 font-semibold text-white hover:text-gray-300">
												Bio
											</h3>
											{profile.bio ? <p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">{profile.bio}</p> : <p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">This user doesn't have a bio yet</p>}
										</div>
									</article>
								</div>
							</div>
						))}
						</>
					}
				</div>
			</div>
		</div>
    )


}