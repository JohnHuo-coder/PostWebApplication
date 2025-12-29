import { Link } from 'react-router-dom';

export default function ErrorPage({ type, message, description }){
    return (
    <>
		<div className="grid min-h-full grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white lg:grid-cols-[max(50%,36rem)_1fr] dark:bg-gray-900">
			<main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
			<div className="max-w-lg">
				<p className="text-base/8 font-semibold text-indigo-600 dark:text-indigo-400">{type}</p>
				<h1 className="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl dark:text-white">
				{message}
				</h1>
				<p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
				{description}
				</p>
				<div className="mt-10">
				<Link to="/" className="text-sm/7 font-semibold text-indigo-600 dark:text-indigo-400">
					<span aria-hidden="true">&larr;</span> Back to home
				</Link>
				</div>
			</div>
			</main>
			<div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
			<img
				alt=""
				src="https://images.unsplash.com/photo-1583585635793-0e1894c169bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
				className="absolute inset-0 size-full object-cover not-dark:hidden"
			/>
			<img
				alt=""
				src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
				className="absolute inset-0 size-full object-cover dark:hidden"
			/>
			</div>
		</div>
    </>
  )
}