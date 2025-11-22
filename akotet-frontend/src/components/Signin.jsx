import React, { useState } from "react";
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

export default function Signin() {
    const [password, setPassword] = useState("");
    const [signingIn, setSigningIn] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSigningIn(true);
        if (password === adminPassword) {
            localStorage.setItem("isAdmin", "true");
            window.location.reload();
        } else {
            alert("Incorrect Password");
            setSigningIn(false);
        }
    };

    return (
        <div className="p-8 bg-[#0C0C0C] min-h-screen flex items-center justify-center" >

            <div className="flex flex-col gap-4 text-[#EEEEEE] border border-[#F2613F] p-8 rounded-md shadow-md max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-[#F2613F]">Signin Component</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label htmlFor="password">Enter admin Password to access admin page</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#1A1A1A] p-2 rounded-md border border-[#481E14] text-white" name="password" type="password" placeholder="admin password" required />
                    <button disabled={signingIn} type="submit" className="bg-[#F2613F] text-white px-4 py-2 rounded-md mt-4 hover:bg-[#d65534] transition">
                        {signingIn ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>

        </div>
    );
}