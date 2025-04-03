'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Yönlendirme için

export function LoginForm() {
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"candidate" | "jury" | "admin" | "ilanYonetici">("candidate");
    const [tcKimlikNo, setTcKimlikNo] = useState("");
    const router = useRouter(); // Yönlendirme için useRouter

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("TC Kimlik No:", tcKimlikNo, "Password:", password);

        // Giriş işlemi başarılıysa yönlendirme
        if (role === "admin") {
            // Admin giriş yaptıysa admin paneline yönlendir
            router.push("/admin");
        } else if (role === "ilanYonetici") {
            // İlan yöneticisi olarak giriş yaptıysa ilan yönetim sayfasına yönlendir
            router.push("/ilanYonetimi");
        } else if (role === "candidate") {
            // Aday olarak giriş yaptıysa başvuru sayfasına yönlendir
            router.push("/aday");
        } else if (role === "jury") {
            // Jüri olarak giriş yaptıysa jüri değerlendirme sayfasına yönlendir
            router.push("/jury/dashboard");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-semibold mb-4">Akademik Başvuru Giriş</h2>

            {/* Role Selection */}
            <div className="flex justify-between mb-4">
                <button
                    type="button"
                    onClick={() => setRole("candidate")}
                    className={`w-2/5    py-2 rounded ${role === "candidate" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Aday
                </button>&nbsp;&nbsp;
                <button
                    type="button"
                    onClick={() => setRole("jury")}
                    className={`w-2/5 py-2 rounded ${role === "jury" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Jüri
                </button>&nbsp;&nbsp;
                <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`w-2/5 py-2 rounded ${role === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Yönetici
                </button>&nbsp;&nbsp;
                <button
                    type="button"
                    onClick={() => setRole("ilanYonetici")}
                    className={`w-2/5 py-2 rounded ${role === "ilanYonetici" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    İlan Yöneticisi
                </button>
            </div>

            {/* TC Kimlik No input */}
            <input
                type="text"
                placeholder="TC Kimlik No"
                value={tcKimlikNo}
                onChange={(e) => setTcKimlikNo(e.target.value)}
                className="border p-2 rounded mb-4"
            />

            {/* Password Input */}
            <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded mb-6"
            />

            {/* Submit Button */}
            <Button type="submit" className="bg-blue-500 text-white py-2 rounded">
                Giriş Yap
            </Button>

            {/* Role-specific Instructions */}
            <div className="text-center text-sm text-gray-600 mt-4">
                {role === "candidate" && <p>Başvuru oluşturabilir ve takip edebilirsiniz.</p>}
                {role === "jury" && <p>Başvuruları değerlendirebilir ve puanlayabilirsiniz.</p>}
                {role === "admin" && <p>Yönetici paneline erişebilirsiniz.</p>}
                {role === "ilanYonetici" && <p>İlanları yönetebilirsiniz.</p>}
            </div>
        </form>
    );
}
