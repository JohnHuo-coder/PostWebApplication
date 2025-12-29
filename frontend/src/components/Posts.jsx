import { useEffect, useState} from "react";
import {Link} from 'react-router-dom';

export default function Posts() {
    const [posts, setPosts] = useState([]);
	const [keyWord, setKeyWord] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const API_URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const getAllPosts= async() => {
			setLoading(true);
			try{
				const res = await fetch(`${API_URL}/api/posts`);
				const data = await res.json();
				if(!res.ok){
					setError(data.error || "fail loading posts");
					return;
				}
				setPosts(data);
			}catch(e){
				setError("Network Error!");
			}finally{
				setLoading(false);
			}
		} 
		getAllPosts();
	},[])

	
	const handleSearch = async(e) => {
		e.preventDefault()
		setLoading(true);
		const keyword = keyWord.trim();
		if(!keyword || keyword === ""){
			setLoading(false);
			setError("Key word is required")
			return
		}
		try{
			const res = await fetch(`${API_URL}/api/posts/search?keyword=${encodeURIComponent(keyword)}`, {
				method: "GET",
				credentials: "include"
			});
			const data = await res.json();
			if (!res.ok){
				console.error("fail getting searched post", data.error);
				setError(data.error || "fail getting searched posts");
			}
			if (!data) {
				alert("Post not found!");
				setPosts([]); 
				return;
			};
			setPosts(data);
		}catch(e){
			console.error("error getting searched posts due to network error", e);
			setError("fail getting searched posts due to Network Error, please try again later")
		}finally{
			setLoading(false);
		}
	}
	
    return (
		<div className="bg-gray-900 py-16 sm:py-24 h-full w-full">
			<div className="mx-auto max-w-8xl px-6 py-6 sm:py-8 lg:px-8">
				<form onSubmit={handleSearch} className="h-full w-full">
					<div className="mx-auto flex max-w-md gap-x-4">
						<label htmlFor="keyword" className="sr-only">
							Enter keyword
						</label>
						<input
							id="keyword"
							type="search"
							placeholder="Enter keyword"
							value={keyWord} 
							onChange={(e) => setKeyWord(e.target.value)}
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
						<h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Posts</h2>
						<p className="mt-2 text-lg/8 text-gray-300">Take a look of what others are doing.</p>
					</div>
					<div>
						<Link to="/posts/post" className= "rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">
							Create New Post
						</Link>
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
						{posts.map((post) => (
							<div key={post.id} className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
								<div className="px-4 py-5 sm:p-6">
									<article className="flex max-w-xl flex-col items-start justify-between">
										<div className="mb-3 flex items-center gap-x-4 text-xs">
											<time dateTime={post.created_at} className="text-gray-400">
												{post.created_at}
											</time>
											<a
												href="#"
												className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800"
											>
												{post.user_public_info.major}
											</a>
											
											<a
												href="#"
												className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800"
											>
												{post.user_public_info.graduation_year}
											</a>
										</div>
										<div className="relative">
											<Link className="text-lg/6 font-semibold text-white hover:text-gray-300" to={`/posts/${post.id}`}>
												{post.title}
											</Link>
										<p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">These are some description of the post</p>
										</div>
										<div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
											{post.user_public_info.avatar_path ? 
											<img alt="" src={post.user_public_info.avatar_path} className="size-10 rounded-full bg-gray-800 ring-4 ring-white sm:size-10 dark:ring-gray-900 dark:outline dark:-outline-offset-1 dark:outline-white/10"/> 
											: <svg fill="currentcolor" viewBox="0 0 24 24" className="size-10 rounded-full text-gray-800 bg-gray-200 ring-4 ring-white sm:size-10 dark:text-white dark:bg-gray-800 dark:ring-gray-900 dark:outline dark:-outline-offset-1 dark:outline-white/10">
												<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
											</svg>}
											<div className="text-sm/6">
												<p className="font-semibold text-white">
													{post.user_public_info.id ?
														<Link to={`/discover/${post.user_public_info.id}`}>
															<span className="absolute inset-0" />
															{post.user_public_info.username ? post.user_public_info.username : "No Name Provided"}
														</Link> : "Anonymous"}
												</p>
											</div>
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