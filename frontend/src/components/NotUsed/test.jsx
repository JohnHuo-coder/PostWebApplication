import {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FaTrash } from "react-icons/fa";

export default function Post(){
    const [tasks, setTasks] = useState([{title:"", description:"", duration:""}]);
    const [title, setTitle] = useState("");
    const [showInfo, setShowInfo] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const API_URL = import.meta.env.VITE_API_URL;

    const { user, onboardStatus, loading, refreshAuth } = useAuth();
    useEffect(() => {
        if (!loading && !user){
            navigate('/login', { replace: true, state: {from: location.pathname} })
        };
        if (!loading && user && onboardStatus !== "completed"){
            console.log("Need Onboarding. Redirecting...");
            navigate('/onboard', { replace: true });
        }
    }, [user, loading, onboardStatus])

    const updateTasks = (index, field, value) => {
        const newTasks = [...tasks];
        newTasks[index][field] = value;
        setTasks(newTasks);
    }

    const addTask = ()=>{
        setTasks([...tasks, {title:"", description:"", duration:""}])
    }

    const deleteTask = (index) => {
        if (!window.confirm("Delete this task?")) return;
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const postNewPost = async(e) => {
        e.preventDefault();
        try{
            const res = await fetch(`${API_URL}/api/posts/post`, {
                        method: "POST", 
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            title: title,
                            tasks: tasks,
                            showInfo: showInfo
                        }),
                        credentials: 'include'
                    });
            const data = await res.json();
            if(!res.ok){
                setError(data.error || "post failed");
                refreshAuth();
                return;
            }
            console.log("post successfully", data)
            navigate("/posts/success");
        }catch(e){
            refreshAuth();
            setError("Network Error!");
        };
    };

    if(loading){
        return(
            <div className="post-main" style={{justifyContent: "center"}}>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <main className="post-main">
            <div style={{display: "flex", flexDirection: "column", alignItems: 'center', border: "1px solid black"}}>
                <form onSubmit={postNewPost} className="form-card tasks-form">
                    <h4 className="form-section-title">Create new post</h4>
                    <p className="text-muted mb-0">
                        Share what you worked on today and track your progress over time.
                        <br />
                        You may optionally share personal details to give others more context about your experience.
                    </p>
                    <div className="row g-3">
                        <div className="col-md-6 mx-auto text-center">
                            <label className="form-label">Task Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter task title"
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {error ? <p style={{ color: "red" }}>{error}</p> : null}
                    {tasks.map((task, index) => (
                        <div  key={index} className="border border-2 rounded p-3">
                            <div className="row g-3">
                                <div className="col-md-8">
                                    <label className="form-label">Task name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter task name"
                                        value={task.title} 
                                        onChange={(e) => updateTasks(index, "title", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Minutes</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={task.duration} 
                                        onChange={(e) => updateTasks(index, "duration", Number(e.target.value))}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-3">
                                <label className="form-label">Description</label>
                                <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Describe your task"
                                value={task.description} 
                                onChange={(e) => updateTasks(index, "description", e.target.value)}
                                required
                                />
                            </div>
                            <button type="button" className="delete-task-btn" onClick={() => deleteTask(index)}>
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addTask}>+ add more task</button>
                    <div className="form-check d-flex align-items-center">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={showInfo}
                            onChange={(e) => setShowInfo(e.target.checked)}
                            id="show"
                        />
                        <label className="form-check-label ms-2" htmlFor="show">
                            show personal information
                        </label>
                    </div>
                    <button type="submit" style={{alignSelf: "center"}} disabled={tasks.length === 0}>confirm</button>
                </form>
            </div>
        </main>
    )

    return (
		<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white dark:bg-slate-600" style={{ backgroundImage: `url(${bgimage})` }}>
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-4xl">
				<div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/90 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
					<form onSubmit={completePublic}>
						<div className="space-y-12">
							<div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
								<h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Create New Post</h2>
								<p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
									Share what you worked on today and track your progress over time.
                                    You may optionally share personal details to give others more context about your experience.
								</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="sm:col-span-4">
                                        <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
											Task Title
										</label>
										<div className="mt-2">
											<input
											id="title"
											type="text"
											placeholder="Enter task title"
                                            value={title} 
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
											className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
											/>
										</div>
                                    </div>
                                </div>

                                <div>{error ? <p style={{ color: "red" }}>{error}</p> : null}</div>

								<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    {tasks.map((task, index) => (
                                    <div key={index}>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="taskname" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                                                Task Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                id="taskname"
                                                type="text"
                                                placeholder="Enter task name"
                                                value={task.title} 
                                                onChange={(e) => updateTasks(index, "title", e.target.value)}
                                                required
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="minutes" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                                                Minutes
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                id="minutes"
                                                type="text"
                                                value={task.duration} 
                                                onChange={(e) => updateTasks(index, "duration", Number(e.target.value))}
                                                required
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="des" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                                                Description
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                id="des"
                                                rows={4}
                                                placeholder="Describe your task"
                                                value={task.description} 
                                                onChange={(e) => updateTasks(index, "description", e.target.value)}
                                                required
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                                />
                                            </div>
                                            <p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">Write a few sentences about this task.</p>
                                        </div>
                                        <button type="button" onClick={() => deleteTask(index)} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500">
                                            <FaTrash />
                                        </button>
                                    </div>
                                    ))}

                                    <button type="button" onClick={addTask}>+ add more task</button>

									

									

							

									

									{/* <div className="col-span-full">
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
									</div> */}
									
									{error ? <p style={{ color: "red" }}>{error}</p> : null}

								</div>
							</div>
						</div>

                        <div className="form-check d-flex align-items-center">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={showInfo}
                                onChange={(e) => setShowInfo(e.target.checked)}
                                id="show"
                            />
                            <label className="form-check-label ms-2" htmlFor="show">
                                show personal information
                            </label>
                        </div>
						
						<div className="mt-6 flex items-center justify-end gap-x-6">
							<button
								type="submit"
                                disabled={tasks.length === 0}
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
								>
								Post
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
    )
}

