import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface EgitimFormProps {
    onSave: (data: any) => void;
}

const kategoriListesi = [
    { value: "1", label: "Önlisans / Lisans Dersleri" },
    { value: "2", label: "Önlisans / Lisans Dersleri (Yabancı dilde)" },
    { value: "3", label: "Lisansüstü Dersleri" },
    { value: "4", label: "Lisansüstü Dersleri (Yabancı dilde)" },
];

const EgitimForm: React.FC<EgitimFormProps> = ({ onSave }) => {
    const [dersAdi, setDersAdi] = useState("");
    const [programAdi, setProgramAdi] = useState("");
    const [donem, setDonem] = useState("");
    const [yil, setYil] = useState("");
    const [kategori, setKategori] = useState("");
    const [kullaniciId, setKullaniciId] = useState<number | null>(null);

    useEffect(() => {
        const id = localStorage.getItem("userId");
        if (id) setKullaniciId(parseInt(id));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!kullaniciId) {
            alert("Kullanıcı ID bulunamadı.");
            return;
        }

        const data = {
            kullaniciId,
            dersAdi,
            programAdi,
            donem,
            yil,
            kategori,
        };

        try {
            const response = await fetch("http://localhost:3001/api/egitimEkle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Sunucu hatası.");
            }

            const result = await response.json();
            console.log("Eğitim faaliyeti kaydedildi:", result);
            onSave(result);
        } catch (err) {
            console.error("Eğitim faaliyeti kaydı hatası:", err);
            alert("Eğitim faaliyeti kaydedilemedi.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Eğitim Öğretim Faaliyeti</h2>

            <input
                type="text"
                placeholder="Dersin Adı"
                value={dersAdi}
                onChange={(e) => setDersAdi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Programın Adı"
                value={programAdi}
                onChange={(e) => setProgramAdi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Dönemi"
                value={donem}
                onChange={(e) => setDonem(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Yılı"
                value={yil}
                onChange={(e) => setYil(e.target.value)}
                className="border p-2 rounded"
            />

            <label htmlFor="kategori" className="block font-semibold mt-4">Kategori Seçiniz</label>
            <select
                id="kategori"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="border p-2 rounded w-full mt-2"
            >
                <option value="">Seçiniz</option>
                {kategoriListesi.map(k => (
                    <option key={k.value} value={k.value}>
                        {k.label}
                    </option>
                ))}
            </select>

            <div className="mt-4 flex justify-center">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Kaydet
                </Button>
            </div>
        </form>
    );
};

export default EgitimForm;
