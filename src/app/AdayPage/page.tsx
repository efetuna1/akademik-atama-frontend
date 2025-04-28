"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

type Basvuru = {
    id: number;
    durum: "BEKLIYOR" | "KABUL" | "RED";
    tarih: string;
    ilan: {
        id: number;
        baslik: string;
    };
};

const AdayPage = () => {
    const [basvurular, setBasvurular] = useState<Basvuru[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchBasvurular = async () => {
            const kullaniciId = localStorage.getItem("userId");

            if (!kullaniciId) {
                alert("Kullanıcı bulunamadı. Lütfen giriş yapın.");
                router.push("/login");
                return;
            }

            try {
                const response = await fetch(`http://localhost:3001/api/adayBasvurular?kullaniciId=${kullaniciId}`);
                const data = await response.json();
                setBasvurular(data);
            } catch (error) {
                console.error("Başvurular alınamadı:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBasvurular();
    }, [router]);

    const durumGosterimi = (durum: string) => {
        switch (durum) {
            case "BEKLIYOR":
                return <span className="text-yellow-500 font-semibold">Beklemede</span>;
            case "KABUL":
                return <span className="text-green-600 font-semibold">Onaylandı</span>;
            case "RED":
                return <span className="text-red-600 font-semibold">Reddedildi</span>;
            default:
                return <span className="text-gray-600">Bilinmiyor</span>;
        }
    };

    const handleCvGoruntule = () => {
        router.push("/adaycv");
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Yükleniyor...</div>;
    }
    <Navbar />
    return (
        <div className="p-6 min-h-screen bg-stone-100">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Başvurularım</h1>

            {basvurular.length === 0 ? (
                <p className="text-center text-gray-600">Henüz bir başvurunuz bulunmamaktadır.</p>
            ) : (
                <div className="grid gap-4">
                    {basvurular.map((basvuru) => (
                        <div key={basvuru.id} className="border p-4 rounded-lg shadow-sm bg-white">
                            <h2 className="text-xl font-semibold text-blue-600">{basvuru.ilan.baslik}</h2>
                            <p className="text-gray-700 mt-2">Başvuru Tarihi: {new Date(basvuru.tarih).toLocaleDateString()}</p>
                            <p className="mt-1">Durum: {durumGosterimi(basvuru.durum)}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-10">
                <Button onClick={handleCvGoruntule}>
                    Özgeçmişimi Görüntüle
                </Button>
            </div>
        </div>
    );
};

export default AdayPage;
