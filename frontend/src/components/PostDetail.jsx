import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import ErrorPage from "./popOuts/ErrorPage";

export default function PostDetail(){
    const { id } = useParams();
    const [postDetail, setPostDetail] = useState({
        title: "",
        created_at: "",
        user_public_info: null,
        tasks: []
    });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getDetail = async() => {
            setLoading(true);
            try{
                const res = await fetch(`${API_URL}/api/posts/${id}`, {
                            method: "GET", 
                            credentials: 'include'
                        });
                const data = await res.json();
                if(!res.ok){
                    setError(data.error || "fail loading details");
                    setErrorStatus(res.status);
                    return;
                }
                setPostDetail(data)
                console.log("load successfully", data)
            }catch(e){
                setError("Network Error!");
                setErrorStatus(0);
            }finally{
                setLoading(false);
            };
        };
        getDetail();
    },[id])

    if (error) {    
            return (
                <ErrorPage type={errorStatus} message={error}/>
            )
        }

    return (
        <>
            {loading ? 
                <div className="flex justify-center bg-gray-900 py-16 sm:py-16 w-full h-full">
                    <div className="flex items-center justify-center" >
                        <svg className="size-15 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="15 47"/>
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="gray" strokeWidth="4" fill="none" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div> :
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white dark:bg-slate-600">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-4xl">
                    <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/90 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                        
                            <div className="space-y-12">
    
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                                                Post Title
                                            </label>
                                            <div className="mt-2">
                                                <p className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"> 
                                                {postDetail.title}
                                                </p>
                                            </div>

                                            <div className="mt-2">
                                                <p className="text-base text-gray-900 sm:text-sm/6 dark:text-white">{postDetail.created_at}</p>
                                            </div>
                                        </div>
                                    </div>
    
                                    
                                    {postDetail.tasks.map((task, index) => (
                                        <div className="mt-10 p-5 grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg border-2 border-gray-700 sm:grid-cols-6">
                                            <div className="sm:col-span-4">
                                                <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                                                    Task Name
                                                </label>
                                                <div className="mt-2">
                                                    <p
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                                    >
                                                    {task.task_name}
                                                    </p>
                                                </div>
                                            </div>
    
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                                                    Minutes
                                                </label>
                                                <div className="mt-2">
                                                    <p
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                                    >
                                                    {task.duration}
                                                    </p>
                                                </div>
                                            </div>
    
                                            <div className="col-span-full">
                                                <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                                                    Description
                                                </label>
                                                <div className="mt-2">
                                                    <p
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                                    >
                                                    {task.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                    </div>
                </div>
            </div>}
        </>
    )
    
}