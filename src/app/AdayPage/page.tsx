"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


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

    const handleGoHome = () => {
        router.push("/"); // Ana sayfaya yönlendirme
    };

    useEffect(() => {
        const fetchBasvurular = async () => {

            try {
                const response = await fetch(`http://localhost:3001/api/juriBasvuru`);
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

    return (
        <div className="p-6 max-h-screen bg-stone-200"
            style={{
                backgroundImage: "url('/banner2.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >

            <div className="p-6 min-h-screen bg-gray-200">
                <Button
                    onClick={handleGoHome}
                    className="text-blue-600 hover:bg-blue-200 rounded "
                >
                    Ana Sayfaya Geri Dön
                </Button>

                <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Aday Sayfası</h1>
                <br></br><hr></hr><hr></hr><br></br>
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Başvurularım</h2>
                <br></br>
                {basvurular.length === 0 ? (
                    <p className="text-center text-gray-600 ">Henüz bir başvurunuz bulunmamaktadır.</p>
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
                )}<div className="flex justify-center mt-10 rounded-lg mr-150 ml-150 ">
                    <Button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer" onClick={handleCvGoruntule}>
                        Özgeçmişimi Görüntüle
                    </Button>
                </div>

                <br></br><hr></hr><hr></hr><br></br>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">KOU Atama Yönergesi Hakkında</h2>
                <p className="text-center max-w-250 text-gray-600 mb-4 ml-auto mr-auto">Kocaeli Üniversitesi Akademik Atama Yönergesi, akademik personel alım süreçlerini düzenleyen bir belgedir. Bu yönerge, adayların başvuru yaparken ve değerlendirilirken uyması gereken kuralları ve kriterleri belirler. Belirli kadrolar için başvurularınızın değerlendirilmeye alınması, resmi aşamalardan ve yetkili üyeler tarafından kontrolden geçirilmesi ve puana göre eleme sistemine tabii tutulması söz konusudur. Değerlendirme süreci sona erdiğinde kişisel aday sayfanız üzerinden size sonucunuz bildirilir. Başvurunuzun onaylanması durumunda kurumu ziyaret ederek gerekli işlemleri sağlamalısınız.</p>
                <p className="text-center text-gray-600 mb-4">Kocaeli Üniversitesi Akademik Atama Yönergesi hakkında detaylı bilgi almak için lütfen <a href="https://www.kocaeli.edu.tr/" target="_blank" className="text-blue-500 hover:underline">buraya</a> tıklayın.</p>
            </div>
        </div>
    );
};

export default AdayPage;
