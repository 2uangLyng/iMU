// src/app/login/page.tsx
'use client'
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "../../action/user";


const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);

    const result = await login(formData);

    if (!result.success) {
      setError(result.error || "An error occurred during login.");
    } else {
      // Chuyển hướng sau khi đăng nhập thành công
      router.push('/'); // Thay đổi đường dẫn phù hợp
    }

    setLoading(false);
  };

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black">
      <form className="my-8" onSubmit={handleSubmit}>
        <Label htmlFor="email" className="mb-2">Email</Label>
        <Input type="email" id="email" name="email" required />

        <Label htmlFor="password" className="mb-2">Password</Label>
        <Input type="password" id="password" name="password" required className="mb-5" />

        {error && <p className="text-red-600">{error}</p>}

        <Button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium" disabled={loading}>
          {loading ? "Logging in..." : "Login &rarr;"}
        </Button>

        <p className="text-right text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </p>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"></div>
      </form>

    </div>
  );
};

export default LoginPage;
