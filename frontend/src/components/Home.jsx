import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import { useAuth } from "./AuthContext";


export default function Home() {
    const { user, loading, refreshAuth } = useAuth();
  

	return (
		<div className="bg-white dark:bg-gray-900 h-full">
		<div className="relative">
			<div className="mx-auto max-w-7xl">
			<div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
				<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				aria-hidden="true"
				className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block dark:fill-gray-900"
				>
				<polygon points="0,0 90,0 50,100 0,100" />
				</svg>

				<div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
				<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
					<div className="hidden sm:mb-10 sm:flex">
						<div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20">
							Some functionalities are still under development.
						</div>
					</div>
					<h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
					See how people like you spend their day
					</h1>
					<p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
					A space for sharing real days, not perfect ones.
					See what people in similar situations are actually doing —
					and feel less alone in your journey.
					</p>
					<div className="mt-10 flex items-center gap-x-6">
					<Link
						to={!loading && user ? "/posts" : "/login"}
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
					>
						Get started
					</Link>
					{/* <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
						Learn more <span aria-hidden="true">→</span>
					</a> */}
					</div>
				</div>
				</div>
			</div>
			</div>
			<div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 dark:bg-gray-800">
			<img
				alt=""
				src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
				className="aspect-3/2 object-cover lg:aspect-auto lg:size-full"
			/>
			</div>
		</div>
		</div>
	)
}