import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-stone-200 p-6"
            style={{
                backgroundImage: "url('/banner2.png')",
                backgroundSize: "cover", // resmi tam kapla
                backgroundRepeat: "no-repeat", // tekrar etmesin
                backgroundPosition: "center", // ortala
            }}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg position-relative w-full max-w-md max-h-full ">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hoş Geldiniz!</h2>
                <LoginForm />
            </div>
        </main>
    );
}