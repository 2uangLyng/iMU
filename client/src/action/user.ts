'use server'

import { signIn } from '@/auth';
import { z } from 'zod';

// Tạo schema Zod để xác thực dữ liệu form
const registerSchema = z.object({
    nameProfile: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const register = async (formData: FormData) => {
    // Lấy dữ liệu từ form
    const nameProfile = formData.get('lastname') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Xác thực dữ liệu với Zod
    const parsedData = registerSchema.safeParse({
        nameProfile,
        email,
        password,
    });

    if (!parsedData.success) {
        // Xử lý lỗi nếu dữ liệu không hợp lệ
        console.error("Validation errors:", parsedData.error.errors);
        return { success: false, errors: parsedData.error.errors };
    }

    // Dữ liệu hợp lệ, gửi lên API
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedData.data), // Gửi dữ liệu đã xác thực
        });

        if (!response.ok) {
            throw new Error(`Failed to register: ${response.statusText}`);
        }

        const responseData = await response.json();
        return { success: true, data: responseData };

    } catch (error) {
        console.error("API error:", error);
        return { success: false, error: (error as Error).message };
    }
};

const login = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Xác thực dữ liệu đầu vào
    const parsedData = loginSchema.safeParse({
        email,
        password,
    });

    if (!parsedData.success) {
        console.error("Validation errors:", parsedData.error.errors);
        return { success: false, errors: parsedData.error.errors };
    }

    try {
        const result = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false, // Không chuyển hướng tự động
        });

        // Kiểm tra kết quả đăng nhập
        if (result?.error) {
            return { success: false, error: result.error };
        }

        // Đăng nhập thành công
        return { success: true };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: "Login failed. Please try again." };
    }
};

export { register, login };
