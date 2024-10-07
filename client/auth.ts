import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Hàm xử lý NextAuth
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // Gửi request tới API của bạn
          const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0]?.message || "Login failed");
          }

          const user = await response.json();

          // Giả sử bạn nhận token từ API và cần lưu nó vào cookies
          // const token = user.token; // Thay đổi để lấy token đúng từ response
          // Lưu token vào cookie hoặc localStorage
          // (Bạn có thể cần sử dụng thư viện cookie để dễ dàng làm việc với cookies)

          return user; // Trả về user object để sử dụng trong session

        } catch (error) {
          console.error("Error during authentication:", error);
          throw new CredentialsSignin("Invalid email or password.");
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
