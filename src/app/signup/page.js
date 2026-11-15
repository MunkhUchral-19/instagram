"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "../../../supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast, Toast } from "@/components/ui/toast"

const Page = () => {
    const router = useRouter()
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        username: ''
    });

    const handleUserInfo = (event) => {
        if (event.target.name === "email") {
            setUserInfo({ ...userInfo, email: event.target.value })
        }
        if (event.target.name === "password") {
            setUserInfo({ ...userInfo, password: event.target.value })
        }
        if (event.target.name === "username") {
            setUserInfo({ ...userInfo, username: event.target.value })
        }
    }

    const signup = async () => {
        const response = await supabase.auth.signUp({
            email: userInfo.email,
            password: userInfo.password
        })

        if (response.error) {
            toast.add({
                title: "try again",
                description: response.error.message,
                type: "error"
            })
        }

        const userId = response.data.user.id

        const res = await supabase.from("profile").insert({
            id: userId,
            username: userInfo.username
        })

        if (res) {
            toast.add({
                title: "User created",
                description: res.data
            })
        }

        console.log(res, "data")
        console.log(response, "response")
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-[350px]">

                {/* Signup Card */}
                <div className="border border-gray-200 px-10 py-10 flex flex-col items-center">

                    {/* Logo / Brand */}
                    <h1 className="text-4xl font-bold tracking-tight mb-3 font-serif">
                        Instagram
                    </h1>

                    <p className="text-center text-sm font-semibold text-gray-500 mb-5">
                        Sign up to see photos and videos from your friends.
                    </p>

                    {/* Facebook Button
                    <Button
                        className="w-full bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold rounded-lg h-9"
                        type="button"
                    >
                        Log in with Facebook
                    </Button> */}

                    {/* Divider */}
                    {/* <div className="flex items-center gap-4 w-full my-5">
                        <div className="h-px bg-gray-300 flex-1" />
                        <span className="text-xs font-semibold text-gray-500">
                            OR
                        </span>
                        <div className="h-px bg-gray-300 flex-1" />
                    </div> */}

                    {/* Signup Form */}
                    <div className="w-full space-y-2">

                        <Input
                            placeholder="Email"
                            name="email"
                            onChange={handleUserInfo}
                            value={userInfo.email}
                            type="email"
                            className="h-10 bg-gray-50 border-gray-300 rounded-sm text-xs focus-visible:ring-1 focus-visible:ring-gray-400"
                        />

                        <Input
                            placeholder="Password"
                            name="password"
                            onChange={handleUserInfo}
                            value={userInfo.password}
                            type="password"
                            className="h-10 bg-gray-50 border-gray-300 rounded-sm text-xs focus-visible:ring-1 focus-visible:ring-gray-400"
                        />

                        <Input
                            placeholder="Username"
                            name="username"
                            onChange={handleUserInfo}
                            type="text"
                            value={userInfo.username}
                            className="h-10 bg-gray-50 border-gray-300 rounded-sm text-xs focus-visible:ring-1 focus-visible:ring-gray-400"
                        />

                    </div>

                    {/* Terms */}
                    <p className="text-xs text-gray-500 text-center leading-5 mt-5">
                        People who use our service may have uploaded your
                        contact information to Instagram. Learn more.
                    </p>

                    <p className="text-xs text-gray-500 text-center leading-5 mt-3">
                        By signing up, you agree to our Terms, Privacy Policy
                        and Cookies Policy.
                    </p>

                    {/* Create Account */}
                    <Button
                        onClick={() => signup()}
                        className="w-full mt-5 h-9 bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold rounded-lg"
                    >
                        Sign up
                    </Button>

                </div>

                {/* Login Link */}
                <div className="border border-gray-200 mt-3 py-5 text-center text-sm">
                    Have an account?{" "}
                    <button
                        onClick={() => router.push("/login")}
                        className="text-[#0095f6] font-semibold hover:text-blue-700"
                    >
                        Log in
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-6">
                    © 2026 Instagram
                </p>

            </div>
        </div>
    )
}

export default Page
