import React, { useState } from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";



export default function Login() {
    // 🔽 1. All useState hooks go here
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // optional
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    // 🔽 2. Firebase handler
    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        if (!email || !email.includes("@")) {
            setError("Please enter a valid email.");
            setLoading(false);
            return;
        }

        if (!password || password.length < 6) {
            setError("Please enter a valid password (min 6 characters).");
            setLoading(false);
            return;
        }

        try {
            if (signIn) {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("✅ Logged in!");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("✅ Signed up!");
            }

            // ✅ Redirect after success
            navigate("/dashboard");

        } catch (error) {
            console.error("🔥 Firebase error:", error);

            if (error.code === "auth/invalid-email") {
                setError("Invalid email format.");
            } else if (error.code === "auth/email-already-in-use") {
                setError("Email already in use. Try logging in.");
            } else if (error.code === "auth/missing-password") {
                setError("Please enter a password.");
            } else {
                setError("Authentication failed. Try again.");
            }
        } finally {
            setLoading(false);
        };
    }


    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-[#f6f5f7] px-4 py-8">
            <div className="relative w-[678px] max-w-full min-h-[400px] bg-white rounded-lg shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)] overflow-hidden font-[Montserrat]">
                {/* Sign Up */}
                <div
                    className={`absolute top-0 h-full transition-all duration-500 ease-in-out left-0 w-1/2 opacity-0 z-[1] ${!signIn ? "translate-x-full opacity-100 z-[5]" : ""
                        }`}
                >
                    <form className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
                        <h1 className="font-bold m-0 text-xl">Create Account</h1>
                        <input
                            type="text"
                            placeholder="Name"
                            className="bg-gray-200 border-none py-3 px-4 my-2 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-gray-200 border-none py-3 px-4 my-2 w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="w-full relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-200 border-none py-3 px-4 my-2 w-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[50%] translate-y-[-50%] text-sm text-gray-600"
                            >
                                {showPassword ? "Show" : <s>Show</s>}
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="rounded-full border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold py-3 px-12 uppercase tracking-wider active:scale-95 focus:outline-none"
                        >
                            {loading ? "Please wait..." : "Sign Up"}
                        </button>
                    </form>
                </div>

                {/* Sign In */}
                <div
                    className={`absolute top-0 h-full transition-all duration-500 ease-in-out left-0 w-1/2 z-[2] ${!signIn ? "translate-x-full" : ""
                        }`}
                >
                    <form className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
                        <h1 className="font-bold m-0 text-xl">Sign in</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-gray-200 border-none py-3 px-4 my-2 w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="w-full relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-200 border-none py-3 px-4 my-2 w-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[50%] translate-y-[-50%] text-sm text-gray-600"
                            >
                                {showPassword ? "Show" : <s>Show</s>}
                            </button>
                        </div>
                        <a
                            href="#"
                            className="text-sm text-gray-700 my-3"
                        >
                            Forgot your password?
                        </a>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="rounded-full border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold py-3 px-12 uppercase tracking-wider active:scale-95 focus:outline-none"
                        >
                            {loading ? "Please wait..." : "Sign In"}
                        </button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div
                    className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-[100] ${!signIn ? "-translate-x-full" : ""
                        }`}
                >
                    <div
                        className={`bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] bg-no-repeat bg-cover bg-left text-white relative left-[-100%] h-full w-[200%] transition-transform duration-500 ease-in-out ${!signIn ? "translate-x-1/2" : ""
                            }`}
                    >
                        {/* Left Panel */}
                        <div
                            className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-500 ease-in-out ${!signIn ? "translate-x-0" : "-translate-x-1/5"
                                }`}
                        >
                            <h1 className="font-bold text-2xl">Welcome Back!</h1>
                            <p className="text-sm font-light leading-5 tracking-wide my-6">
                                To keep connected with us please login with your personal info
                            </p>
                            <button
                                type="button"
                                className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-12 uppercase tracking-wider active:scale-95 focus:outline-none"
                                onClick={() => setSignIn(true)}
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Right Panel */}
                        <div
                            className={`absolute right-0 flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-500 ease-in-out ${!signIn ? "translate-x-1/5" : "translate-x-0"
                                }`}
                        >
                            <h1 className="font-bold text-2xl">Hello, Friend!</h1>
                            <p className="text-sm font-light leading-5 tracking-wide my-6">
                                Enter your personal details and start journey with us
                            </p>
                            <button
                                type="button"
                                className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-12 uppercase tracking-wider active:scale-95 focus:outline-none"
                                onClick={() => setSignIn(false)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}