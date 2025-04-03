"use client";

import Link from "next/link";
import { useState } from "react";
import MakaleForm from "@/components/cv/MakaleForm";
import Modal from "@/components/cv/Modal";
import { Button } from "@/components/ui/button";

const ilanlar = [
    {
        id: 1,
        title: "Bilimsel Araştırma Bursu",
        description: "Bu burs, bilimsel araştırma projelerine destek sağlamaktadır.",
        endDate: "2025-05-01",
        criteria: "Lisans mezunu, araştırma tecrübesi",
        status: "open",
    },
    {
        id: 2,
        title: "Öğretim Üyesi Aranıyor",
        description: "Yeni bir öğretim üyesi alınacaktır.",
        endDate: "2025-06-01",
        criteria: "Doktora mezunu, öğretim deneyimi",
        status: "open",
    },
];

export default function AdayPage() {
    const [isMakaleFormOpen, setIsMakaleFormOpen] = useState(false);

    return (
        <main className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8 w-full">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Aday Paneli</h1>

                {/* İlan Listesi */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Mevcut İlanlar</h2>
                    <div className="flex flex-col gap-4">
                        {ilanlar.map((ilan) => (
                            <div key={ilan.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <h3 className="font-semibold text-lg">{ilan.title}</h3>
                                <p className="text-gray-600">Son başvuru tarihi: {ilan.endDate}</p>
                                <p className="text-gray-600">Başvuru Kriterleri: {ilan.criteria}</p>

                                <div className="mt-2 flex gap-4">
                                    {/* Detaya Git */}
                                    <Link href={`/ilan/${ilan.id}`} className="text-blue-500 hover:underline">
                                        Detayları Gör
                                    </Link>
                                    {/* Başvuru Yap */}
                                    <Link href={`/basvuru/${ilan.id}`} className="text-green-500 hover:underline">
                                        Başvuru Yap
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Özgeçmiş Ekleme Alanı */}
                <div className="mb-8">
                    <h1 className="text-2xl text-blue-600 font-bold mb-4">Aday Özgeçmiş</h1><br></br>
                    <h2 className="text-xl font-bold mb-3">Makaleler</h2>

                    {/* Makale Ekle Butonu */}
                    <Button onClick={() => setIsMakaleFormOpen(true)} className="bg-blue-500 text-white py-4 px-4 rounded">
                        + Makale Ekle
                    </Button>

                    {/* Modal İçinde Makale Formu */}
                    <Modal isOpen={isMakaleFormOpen} onClose={() => setIsMakaleFormOpen(false)}>
                        <MakaleForm onSave={function (): void {
                            throw new Error("Function not implemented.");
                        }} />
                    </Modal>
                </div>
            </div>
        </main>
    );
}
