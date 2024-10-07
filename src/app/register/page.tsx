'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { register } from "@/action/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
const RegisterPage = async () => {
    
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    
    const result = await register(formData);
    
    if (!result.success) {
      setError(result.error || "An error occurred during login.");
    } else {
      // Chuyển hướng sau khi đăng nhập thành công
      router.push('/login'); // Thay đổi đường dẫn phù hợp
    }
    
    setLoading(false);
  };


    return (
        <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black">
            <h2>Welcome to iMu team</h2>
            <p>Please provide all the neccessary information</p>


            <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <div className="flex flex-col">
                        <Label htmlFor="firstname" className="mb-2">First Name</Label>
                        <Input type="text" id="firstname" placeholder="John" name="firstname"/>
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="lastname" className="mb-2" >Last Name</Label>
                        <Input type="text" id="lastname" placeholder="Michen" name="lastname"/>       
                    </div>
                </div>
                <Label htmlFor="email" className="mb-2">Email</Label>
                <Input type="email" id="email" placeholder="test@example.com" name="email"/>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="********" name="password" className="mb-5"/>

                <Button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">Sign up &rarr;</Button>
          
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Already have an account? <Link href="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
export default RegisterPage;