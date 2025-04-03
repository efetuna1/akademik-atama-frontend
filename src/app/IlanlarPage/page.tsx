// app/ilanlar/page.tsx
import Link from "next/link";

const ilanlar = [
    {
        id: 1,
        title: "Bilimsel Araştırma Bursu",
        description: "Bu burs, bilimsel araştırma projelerine destek sağlamaktadır.",
        startDate: "2025-04-01",
        endDate: "2025-05-01",
        criteria: "Lisans mezunu, araştırma tecrübesi",
        status: "open",
        applicationsCount: 10,
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

export default function IlanlarPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-35">
                <h1 className="text-4xl font-bold text-blue-600 mb-8">Güncel İlanlar</h1>

                {/* İlan Listesi */}
                <div className="flex flex-col gap-6">
                    {ilanlar.map((ilan) => (
                        <div key={ilan.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                            <h3 className="font-semibold text-lg">{ilan.title}</h3>
                            <p className="text-gray-600">Son başvuru tarihi: {ilan.endDate}</p>
                            <p className="text-gray-600">Başvuru Kriterleri: {ilan.criteria}</p>
                            <p className="text-gray-600">Başvuru Sayısı: {ilan.applicationsCount}</p>

                            {/* Dinamik olarak detay sayfasına yönlendir */}
                            <Link href={`/ilan/${ilan.id}`} className="text-blue-500 hover:underline mt-2 block">
                                Başvuru Detayları
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
