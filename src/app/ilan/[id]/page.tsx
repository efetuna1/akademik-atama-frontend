// app/ilan/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Örnek ilan verisi, gerçek uygulamalarda bu veriyi API'den alırsınız
const ilanlar = [
    {
        id: 1,
        title: "Bilimsel Araştırma Bursu",
        description: "Bu burs, bilimsel araştırma projelerine destek sağlamaktadır.",
        startDate: "2025-04-01",
        endDate: "2025-05-01",
        criteria: "Lisans mezunu, araştırma tecrübesi",
        status: "open", // İlanın durumu (açık veya kapalı)
        applicationsCount: 10, // Başvuru sayısı
    },
    {
        id: 2,
        title: "Öğretim Üyesi Aranıyor",
        description: "Yeni bir öğretim üyesi alınacaktır.",
        startDate: "2025-05-01",
        endDate: "2025-06-01",
        criteria: "Doktora mezunu, öğretim deneyimi",
        status: "closed",
        applicationsCount: 5,
    },
];

export default function IlanDetailPage() {
    const { id } = useParams(); // Parametreyi almak için useParams kullanıyoruz

    const [ilan, setIlan] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const ilanData = ilanlar.find((ilan) => ilan.id === parseInt(id as string));
            setIlan(ilanData);
        }
    }, [id]);

    if (!ilan) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">{ilan.title}</h1>

                <p className="text-gray-700 mb-6">{ilan.description}</p>

                <div className="mb-4">
                    <h3 className="font-semibold text-lg">Başvuru Kriterleri:</h3>
                    <p>{ilan.criteria}</p>
                </div>

                <div className="mb-4">
                    <h3 className="font-semibold text-lg">Başvuru Tarihleri:</h3>
                    <p>Başlangıç: {ilan.startDate}</p>
                    <p>Bitiş: {ilan.endDate}</p>
                </div>

                <div className="mb-4">
                    <h3 className="font-semibold text-lg">Başvuru Durumu:</h3>
                    <p>{ilan.status === "open" ? "Açık" : "Kapalı"}</p>
                </div>

                {ilan.status === "open" && (
                    <button className="bg-blue-500 text-white py-3 w-30 rounded mt-4">Başvuru Yap</button>
                )}
            </div>
        </main>
    );
}
