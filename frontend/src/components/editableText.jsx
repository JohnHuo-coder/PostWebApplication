import {useState} from "react";


export default function EditableText({fieldName, field, onSave, type="text", min, max}){
    const [draft, setDraft] = useState({initValue});
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        setDraft(field);
    }, [field]);
    return(
        <>
        {isEditing ? 
            <>
                <label
                    htmlFor="fieldname"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                    {fieldName}
                </label>

                <div className="mt-2 flex items-center gap-x-3">
                    <input
                        id="fieldname"
                        type="text"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        {...(type === "number" && { min, max })}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm dark:bg-white/5 dark:text-white"
                    />

                    <button
                        type="button"
                        onClick={() => {
                            onSave(type === "number" ? Number(draft) : draft);
                            setIsEditing(false);
                        }}
                        className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setDraft(field); 
                            setIsEditing(false);
                        }}
                        className="text-sm font-semibold text-gray-500 hover:text-gray-700"
                        >
                        Cancel
                    </button>
                </div>
            </> : 

            <>
                <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                    {fieldName}
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                    <span className="text-gray-900 dark:text-white">
                        {field || "Not provided"}
                    </span>

                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                        Update
                    </button>
                </div>
            </>
        }

    </>

    )
}


// import { useState, useEffect } from "react";

// export default function EditableText({
//   label,
//   value,
//   onSave,
//   type = "text",
//   required = false,
//   min,
//   max,
// }) {
//   const [draft, setDraft] = useState(value ?? "");
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setDraft(value ?? "");
//   }, [value]);

//   const handleSave = () => {
//     if (required && draft === "") {
//       setError("This field is required");
//       return;
//     }

//     setError("");

//     const parsedValue =
//       type === "number" ? Number(draft) : draft;

//     onSave(parsedValue);
//     setIsEditing(false);
//   };

//   return (
//     <div className="sm:col-span-4">
//       <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
//         {label}
//         {required && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       {isEditing ? (
//         <div className="mt-2">
//           <div className="flex items-center gap-x-3">
//             <input
//               type={type}
//               value={draft}
//               onChange={(e) => {
//                 setDraft(e.target.value);
//                 setError("");
//               }}
//               required={required}
//               {...(type === "number" && { min, max })}
//               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 dark:bg-white/5 dark:text-white"
//             />

//             <button
//               type="button"
//               onClick={handleSave}
//               className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white"
//             >
//               Save
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 setDraft(value ?? "");
//                 setError("");
//                 setIsEditing(false);
//               }}
//               className="text-sm font-semibold text-gray-500"
//             >
//               Cancel
//             </button>
//           </div>

//           {error && (
//             <p className="mt-1 text-sm text-red-500">
//               {error}
//             </p>
//           )}
//         </div>
//       ) : (
//         <div className="mt-2 flex items-center gap-x-3">
//           <span className="text-gray-900 dark:text-white">
//             {value || "Not provided"}
//           </span>

//           <button
//             type="button"
//             onClick={() => setIsEditing(true)}
//             className="text-sm font-semibold text-indigo-600"
//           >
//             Update
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
