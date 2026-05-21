"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validations";
import { useAuth } from "@/contexts/auth-context";
import { apiClient } from "@/lib/api-client";
import { motion } from "framer-motion";
import { KeyRound, Mail, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const sessionExpired = searchParams.get("expired") === "true";

  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      const response = await apiClient.post<{ token: string; user: any }>("/auth/login", data);
      login(response.token, response.user);
    } catch (error: any) {
      console.error("Login failed:", error);
      setApiError(error.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#000000] overflow-hidden px-4 font-sans">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ffcc00]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#128999]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Login Card Shell */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-6">
          <img src="/logo.jpg" alt="Nidaan Logo" className=" h-16 w-auto mx-auto mb-4" />
          {/* <h1 className="text-3xl font-extrabold text-white tracking-tight">NIDAAN</h1> */}
          <p className="text-[#86cbd0] text-sm font-semibold tracking-wider mt-1 uppercase">Admin Portal</p>
        </div>

        <Card className="border border-[#164a53] bg-[#09292f]/70 backdrop-blur-xl shadow-2xl shadow-black/40">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-bold text-white text-center">Welcome Back</CardTitle>
            <CardDescription className="text-[#86cbd0] text-center text-sm">
              Enter your credentials to manage the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Session Expired / Custom Error */}
            {sessionExpired && !apiError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Your session has expired. Please login again.</span>
              </motion.div>
            )}

            {apiError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{apiError}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold text-[#b9e1e4]">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86cbd0]" />
                  <Input
                    id="email"
                    placeholder="admin@nidaan.org"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className="pl-10 border-[#164a53] bg-[#09292f]/50 text-white placeholder-[#86cbd0]/40 focus:border-[#ffcc00] focus:ring-[#ffcc00]/20 rounded-xl"
                    disabled={isSubmitting}
                  />
                  {/* Wait, we register email and password below. Let me make sure the register calls are clean and standard. */}
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 font-medium">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold text-[#b9e1e4]">
                  Password
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86cbd0]" />
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                    {...register("password")}
                    className="pl-10 border-[#164a53] bg-[#09292f]/50 text-white placeholder-[#86cbd0]/40 focus:border-[#ffcc00] focus:ring-[#ffcc00]/20 rounded-xl"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1 font-medium">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-[#ffcc00] text-black font-semibold hover:bg-[#e6b800] active:scale-[0.98] transition-all rounded-xl py-6 flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/10 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In to Dashboard</span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pt-0 border-t border-[#164a53] mt-4 justify-center">
            <p className="text-xs text-[#86cbd0] mt-3">
              Authorized access only. All activities are logged.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
