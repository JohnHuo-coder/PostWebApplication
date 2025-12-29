// import {useParams} from "react-router-dom";
// import{useEffect, useState} from "react";

// export default function UserProfile(){
//     const {id} = useParams();
//     const [loading, setLoading] = useState(false);
//     const [detailedProfile, setDetailedProfile] = useState({});
//     const [added, setAdded] = useState(false);
//     const API_URL = import.meta.env.VITE_API_URL;
//     const defaultBg = 'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
//     const [userProfile, setUserProfile] = useState({});
// 	const [posts, setPosts] = useState([]);
//     const [error, setError] = useState("")
// 	const [errorStatus, setErrorStatus] = useState("")

//     useEffect(() => {
//         const fetchUser = async() => {
//             setLoading(true);
//             try{
//                 const res = await fetch(`${API_URL}/api/users/${id}`);
//                 const data = await res.json();
//                 if (!data || !data.id) {
//                     alert("User not found!");
//                     return;
//                 }
//             setDetailedProfile(data);
//             }catch(e){
//             console.log(`error getting user details with id: ${id}`);
//             }finally{
//             setLoading(false);
//             }
//         }
//         fetchUser();
//     },[id])
    
//     if (error) {    
// 			return (
// 				<ErrorPage type={errorStatus} message={error}/>
// 			)
// 		}

//     return(
//         <main className = "userprofile-main">
//             <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
//                 <img src={detailedProfile.profile_picture} alt="picture" style={{ width: "100%", maxWidth: "250px", height: "auto", borderRadius: "10px"}}/>
//                 <h3>{detailedProfile.first_name} {detailedProfile.last_name}</h3>
//                 <span>{detailedProfile.email}</span>
//                 <span>{detailedProfile.major}</span>
//                 <span>{detailedProfile.graduation_year}</span>
//                 <p>{detailedProfile.bio}</p>
//                 <button style={{backgroundColor: added? "green" : "grey"}} onClick={() => setAdded(!added)}>{added? "✔":"add"}</button>
//             </div>
//         </main>
//     )

    

//     }


import { useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import ErrorPage from "./popOuts/ErrorPage";

export default function UserProfile() {
    const {id} = useParams();
    const [postLoading, setPostLoading] = useState(false);
	const [userLoading, setUserLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
	const defaultBg = 'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

    const [userProfile, setUserProfile] = useState({});
	const [posts, setPosts] = useState([]);
    const [error, setError] = useState("")
	const [errorStatus, setErrorStatus] = useState("")

    useEffect(() => {
        const fetchUser = async() => {
			setUserLoading(true);
            try{
                const res = await fetch(`${API_URL}/api/users/${id}`);
				const data = await res.json();
				if (!res.ok){
					setError(data.error || 'fail fetching user');
					setErrorStatus(res.status)
				}
            	setUserProfile(data);
            }catch(e){
            	setError("Network Error!");
				setErrorStatus(0);
            }finally{
				setUserLoading(false);
			}
        }
        fetchUser();
    },[id])


	useEffect(() => {
		const fetchUserPosts = async() => {
			setPostLoading(true);
			try{
				const res = await fetch(`${API_URL}/api/users/${id}/posts`, {
					method: "GET",
					credentials: "include"
				})
				const data = await res.json();
				if (!res.ok){
					setError(data.error || 'fail fetching user');
					setErrorStatus(res.status)
				}
				setPosts(data);
			}catch(e){
				setError("Network Error!");
				setErrorStatus(0);
			}finally{
				setPostLoading(false);
			}
		}
		fetchUserPosts();
    }, [id])
    

	if (error) {    
			return (
				<ErrorPage type={errorStatus} message={error}/>
			)
		}

    return (
		<>
		{userLoading ? 
			<div className="flex justify-center bg-gray-900 py-16 sm:py-16 w-full h-full">
				<div className="flex items-center justify-center" >
					<svg className="size-15 animate-spin" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="15 47"/>
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="gray" strokeWidth="4" fill="none" strokeLinecap="round"/>
					</svg>
				</div>
			</div> : 
			<div className="bg-gray-900 py-16 sm:py-16 w-full">
				<div>
					<img alt="" src={userProfile.bgimage_path ? userProfile.bgimage_path : defaultBg} className="h-32 w-full object-cover lg:h-48" />
					<div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
						<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5" >
							<div className="flex">
								{userProfile.avatar_path ? 
								<img alt="" src={userProfile.avatar_path} className="size-24 rounded-full ring-4 ring-white sm:size-32 dark:ring-gray-900 dark:outline dark:-outline-offset-1 dark:outline-white/10"/> 
								: <svg fill="currentcolor" viewBox="0 0 24 24" className="size-24 rounded-full text-gray-900 bg-gray-200 ring-4 ring-white sm:size-32 dark:text-white dark:bg-gray-800 dark:ring-gray-900 dark:outline dark:-outline-offset-1 dark:outline-white/10">
									<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
								</svg>}
							</div>
							<div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pt-10">
								<div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
									<h1 className="truncate text-2xl font-bold text-gray-900 dark:text-white">{userProfile.username ? userProfile.username : "Not Provided"}</h1>
								</div>
							</div>
						</div>

						<div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
							<h1 className="truncate text-2xl font-bold text-gray-900 dark:text-white">{userProfile.username ? userProfile.username : "Not Provided"}</h1>
						</div>
					</div>
				</div>
				
				<div className="px-4 py-5 sm:px-5 sm:py-5">
					<dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200 dark:sm:divide-white/10">
					<div className="sm:flex sm:px-6 sm:py-5">
						<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0 lg:w-48 dark:text-gray-400">
						University Name
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6 dark:text-white">
						{userProfile.university_name ? <p>{userProfile.university_name}</p> : <p className="text-gray-500">University name not provided</p>}
						</dd>
					</div>
					<div className="sm:flex sm:px-6 sm:py-5">
						<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0 lg:w-48 dark:text-gray-400">
						School/Department Name
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6 dark:text-white">
						{userProfile.school ? <p>{userProfile.school}</p> : <p className="text-gray-500">School or Department name not provided</p>}
						</dd>
					</div>
					<div className="sm:flex sm:px-6 sm:py-5">
						<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0 lg:w-48 dark:text-gray-400">
						Major
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6 dark:text-white">
							{userProfile.major}
						</dd>
					</div>
					<div className="sm:flex sm:px-6 sm:py-5">
						<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0 lg:w-48 dark:text-gray-400">
						Graduation Year
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6 dark:text-white">
							{userProfile.graduation_year}
						</dd>
					</div>
					<div className="sm:flex sm:px-6 sm:py-5">
						<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0 lg:w-48 dark:text-gray-400">
						Bio
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6 dark:text-white">
						{userProfile.bio ? <p>{userProfile.bio}</p> : <p className="text-gray-500">This user hasn't say anything yet</p>}
						</dd>
					</div>
					</dl>
				</div>

				<div className="mx-auto max-w-8xl px-6 py-6 sm:py-8 lg:px-8" >
					
					<h3 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-4xl">User posts</h3>
					<p className="mt-4 text-lg/8 text-gray-300">Take a look of their accomplishments.</p>
					<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{postLoading ? 
						<div className="col-span-full flex justify-center">
							<div className="flex items-center justify-center" >
								<svg className="size-15 animate-spin" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="15 47"/>
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="gray" strokeWidth="4" fill="none" strokeLinecap="round"/>
								</svg>
							</div>
						</div> :
						<>
							{posts.map((post) => (
								<div key={post.id} className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
									<div className="px-4 py-5 sm:p-6">
										<article className="flex max-w-xl flex-col items-start justify-between">
											<div className="mb-3 flex items-center gap-x-4 text-xs">
												<time dateTime={post.created_at} className="text-gray-400">
													{post.created_at}
												</time>

											</div>
											<div className="relative">
												<Link className="text-lg/6 font-semibold text-white hover:text-gray-300" to={`/posts/${post.id}`}>
													{post.title}
												</Link>
												<p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">These are some description of the post</p>
											</div>
											{/* <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
											<img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-800" />
											<div className="text-sm/6">
												<p className="font-semibold text-white">
												<a href={post.author.href}>
													<span className="absolute inset-0" />
													{post.author.name}
												</a>
												</p>
												<p className="text-gray-400">{post.author.role}</p>
											</div>
											</div> */}
										</article>
									</div>
								</div>
							))}
						</>}
					</div>
				</div>
			</div>
		}
		</>
    )
}

