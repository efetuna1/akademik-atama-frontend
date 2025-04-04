"use client";

import Link from "next/link";
import { useState } from "react";
import MakaleForm from "@/components/cv/MakaleForm";
import BilimselToplantiForm from "@/components/cv/BilimselToplantiForm";
import KitapForm from "@/components/cv/KitapForm";
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
    const [modalType, setModalType] = useState<"makale" | "toplanti" | "kitap" | null>(null);

    const handleMakaleSave = (data: any) => {
        console.log("Makale Kaydedildi:", data);
        setModalType(null);
    };
    const handleToplantiSave = (data: any) => {
        console.log("Bilimsel Toplantı Kaydedildi:", data);
        setModalType(null);
    }
    const handleKitapSave = (data: any) => {
        console.log("Kitap Kaydedildi:", data);
        setModalType(null);
    };



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
                                    <Link href={`/ilan/${ilan.id}`} className="text-blue-500 hover:underline">
                                        Detayları Gör
                                    </Link>
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
                    <h1 className="text-2xl text-blue-600 font-bold mb-4">Aday Özgeçmiş</h1>
                    <hr></hr>
                    <hr></hr>
                    <br></br>
                    <h2 className="text-xl font-bold mb-3">Makaleler</h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("makale")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            + Makale Ekle
                        </Button>
                    </div>

                    <hr></hr>
                    <br></br>
                    <h2 className="text-xl font-bold mb-3">Bilimsel Toplantılar</h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("toplanti")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            + Bilimsel Toplantı Ekle
                        </Button>
                    </div>

                    <hr></hr>
                    <br></br>


                    <h2 className="text-xl font-bold mb-3">Kitaplar</h2>

                    {/* Kitap Ekle Butonu */}
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("kitap")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            + Kitap Ekle
                        </Button>
                    </div>
                    <hr></hr>
                    <br></br>
                    <Modal
                        isOpen={modalType === "makale"}
                        onClose={() => setModalType(null)}
                        title="Makale Ekle"
                    >
                        <MakaleForm onSave={handleMakaleSave} />
                    </Modal>

                    <Modal
                        isOpen={modalType === "toplanti"}
                        onClose={() => setModalType(null)}
                        title="Bilimsel Toplantı Ekle"
                    >
                        <BilimselToplantiForm onSave={handleToplantiSave} />
                    </Modal>
                    {/* Modal İçinde Kitap Formu */}
                    <Modal
                        isOpen={modalType === "kitap"}
                        onClose={() => setModalType(null)}
                        title="Kitap Ekle"
                    >
                        <KitapForm onSave={handleKitapSave} />
                    </Modal>
                </div>
            </div>
        </main>
    );
}