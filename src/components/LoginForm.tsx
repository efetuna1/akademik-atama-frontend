'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"candidate" | "jury" | "admin" | "ilanYonetici">("candidate");
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tcKimlikNo, parola: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Giriş başarısız");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userId", data.user.id.toString());

      const backendRole = data.user.role;

      switch (backendRole) {
        case "ADMIN":
          router.push("/admin");
          break;
        case "ILANYONETICI":
          router.push("/ilanYonetimi");
          break;
        case "JURI":
          router.push("/jury/dashboard");
          break;
        case "ADAY":
        default:
          router.push("/IlanlarPage");
          break;
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Sunucu hatası");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto mt-10"
    >
      <h2 className="text-center text-2xl font-semibold mb-4">Akademik Başvuru Giriş</h2>

      <input
        type="text"
        placeholder="TC Kimlik No"
        value={tcKimlikNo}
        onChange={(e) => setTcKimlikNo(e.target.value)}
        className="border p-2 rounded mb-4"
        required
      />

      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-4"
        required
      />

      <Button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
      </Button>

      <div className="text-center text-sm text-gray-600 mt-4">
        {role === "candidate" && <p>Başvuru oluşturabilir ve takip edebilirsiniz.</p>}
        {role === "jury" && <p>Başvuruları değerlendirebilir ve puanlayabilirsiniz.</p>}
        {role === "admin" && <p>Yönetici paneline erişebilirsiniz.</p>}
        {role === "ilanYonetici" && <p>İlanları yönetebilirsiniz.</p>}
      </div>
    </form>
  );
}
