"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/api";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        const { data } = await auth.register(form);
        localStorage.setItem("token", data.accessToken);
      } else {
        const { data } = await auth.login({ email: form.email, password: form.password });
        localStorage.setItem("token", data.accessToken);
      }
      toast.success(isRegister ? "Account created!" : "Welcome back!");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="font-display text-2xl font-bold text-brand-900">Luxe</span>
            <span className="font-display text-2xl font-light text-brand-500">Fabrics</span>
          </Link>
          <h1 className="text-2xl font-display font-bold">{isRegister ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-gray-500 mt-2">{isRegister ? "Join our community of creators" : "Sign in to your account"}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
          {isRegister && (
            <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
          )}
          <input placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
          {isRegister && (
            <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
          )}
          <input placeholder="Password" type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-brand-500 text-white rounded-full font-bold hover:bg-brand-600 transition-colors disabled:opacity-50">
            {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">or</span></div>
          </div>

          <button type="button" className="w-full py-3 border-2 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-brand-600 font-medium ml-1">
              {isRegister ? "Sign In" : "Create one"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
