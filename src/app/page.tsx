"use client";

import Link from "next/link"
import { useActionState } from "react";
import { register } from "./actions/authactions";
///SIGN UP
export default function Page() {
    const [errorMessage, formAction, isPending] = useActionState(register, undefined);
    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-white ">
                <div className="w-full max-w-sm space-y-6 ">
                    <h1 className="text-center text-2xl font-semibold text-gray-900 ">Sign Up </h1>
                    <form 
                    action={formAction}
                    className="space-x-4 ">
                        <div className="relative h-fit">
                            <input className=" w-full rounded-md border border-gray-300  text-sm px-3 pb-1 pt-7 focus:border-black focus-online:border-black focus:ring-0"
                                type="email" 
                                name="email" 
                                required
                                 />
                            <label className="absolute left-3 top-2 text-[12px]" > Email: </label>
                        </div>
                        <div className="relative h-fit">
                            <input className=" w-full rounded-md border border-gray-300  text-sm px-3 pb-1 pt-7 focus:border-black focus-online:border-black focus:ring-0"
                                type="password" 
                                name="password" 
                               required minLength={8}
                                 />
                            <label className="absolute left-3 top-2 text-[12px]" > Password: </label>
                        </div>
                        <button disabled={isPending} className="w-full rounded-md bg-black text-sm text-white  py-2 font-medium hover:bg-gray-500 focus:outline-none disable:cursor-not-allowed disabled:bg-gray-300  "
                        //  {isPending ? "Registering..." : "Register"}
                        > Register
                        </button>
                        <p className="text-center text-xs text-gray-600 ">Have an account? {""}
                            <Link className="text-blue-400 hover:text-blue-600" href="/signin">Register
                            </Link>
                        </p>
                        {errorMessage && (<p className="text-red-500 text-sm text-center">{errorMessage}</p>)}

                    </form>
                </div>
            </div>
        </>
    )
}