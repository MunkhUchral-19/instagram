"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { supabase } from "../../../supabase/client"
import { useState } from "react"

const Page = () => {
    const router = useRouter()
    const [userInfo, setUserInfo] = useState({ email: '', password: '' });

    const handleUserInfo = (event) => {
        if (event.target.name === "email") {
            setUserInfo({ ...userInfo, email: event.target.value })
        }
        if (event.target.name === "password") {
            setUserInfo({ ...userInfo, password: event.target.value })
        }
    }

    const login = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: userInfo.email,
            password: userInfo.password
        })
        if (error) {
            alert("Cannot be empty")
            return
        } else {
            alert("success")
            router.push(`/`)
            return
        }



        console.log(data, 'data')
        console.log(error, 'error')
    }

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-4">

            <div className="w-full max-w-[350px]">

                {/* Login Card */}
                <div className="bg-white border border-gray-200 px-10 py-10 flex flex-col items-center">

                    <h1 className="text-4xl font-semibold tracking-tight mb-10">
                        Instagram
                    </h1>

                    <div className="w-full flex flex-col gap-3">

                        <Input
                            placeholder="Email"
                            onChange={(e) => handleUserInfo(e)}
                            value={userInfo.email}
                            name="email"
                            type="email"
                            className="h-11 bg-[#fafafa] text-xs"
                        />

                        <Input
                            placeholder="Password"
                            onChange={(e) => handleUserInfo(e)}
                            value={userInfo.password}
                            name="password"
                            type="password"
                            className="h-11 bg-[#fafafa] text-xs"
                        />

                        <Button
                            onClick={login}
                            className="w-full h-9 mt-2 bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold"

                        >
                            Log in
                        </Button>

                    </div>

                    {/* <div className="flex items-center w-full gap-4 my-6">
                        <div className="h-px bg-gray-200 flex-1" />
                        <span className="text-xs font-semibold text-gray-400">
                            OR
                        </span>
                        <div className="h-px bg-gray-200 flex-1" />
                    </div> */}

                    {/* <button className="text-sm font-semibold text-[#385185]">
                        Log in with Facebook
                    </button> */}

                    <button className="text-xs text-[#00376b] mt-5">
                        Forgot password?
                    </button>

                </div>

                {/* Signup Link */}
                <div className="bg-white border border-gray-200 mt-3 py-5 text-center">
                    <span className="text-sm text-gray-800">
                        Don't have an account?{" "}
                    </span>

                    <button
                        onClick={() => router.push(`/signup`)}
                        className="text-sm font-semibold text-[#0095f6] hover:text-[#00376b]"
                    >
                        Sign up
                    </button>
                </div>

            </div>

            <p className="text-xs text-gray-400 mt-8">
                © 2026 Instagram
            </p>

        </div>
    )
}

export default Page