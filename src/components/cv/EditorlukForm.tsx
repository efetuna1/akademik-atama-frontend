import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface EditorlukFormProps {
    onSave: (data: any) => void;
}

const secenekler = [
    { value: "1", label: "SCI-E, SSCI, AHCI veya E-SCI Kapsamındaki Dergilerde Baş Editörlük Görevinde Bulunmak" },
    { value: "2", label: "SCI-E, SSCI, AHCI veya E-SCI Kapsamındaki Dergilerde Yardımcı/Ortak Editörlük Görevinde Bulunmak" },
    { value: "3", label: "SCI-E, SSCI, AHCI veya E-SCI Kapsamındaki Dergilerde Asistan Editörlük Görevinde Bulunmak" },
    { value: "4", label: "SCI-E, SSCI, AHCI veya E-SCI Kapsamındaki Dergilerde Yayın Kurulu Üyeliği" },
    { value: "5", label: "Uluslararası diğer indekslerde Baş Editörlük" },
    { value: "6", label: "Uluslararası diğer indekslerde Yardımcı Editörlük" },
    { value: "7", label: "Uluslararası diğer indekslerde Asistan Editörlük" },
    { value: "8", label: "Uluslararası diğer indekslerde Yayın Kurulu Üyeliği" },
    { value: "9", label: "ULAKBİM Dergilerinde Baş Editörlük" },
    { value: "10", label: "ULAKBİM Dergilerinde Yayın Kurulu Üyeliği" },
    { value: "11", label: "SCI-E, SSCI veya AHCI kapsamındaki dergilerde hakemlik" },
    { value: "12", label: "Uluslararası indeksli dergilerde hakemlik" },
    { value: "13", label: "ULAKBİM Dergilerinde hakemlik" },
];

const EditorlukForm: React.FC<EditorlukFormProps> = ({ onSave }) => {
    const [dergiAdi, setDergiAdi] = useState("");
    const [dergiSayisi, setDergiSayisi] = useState("");
    const [yil, setYil] = useState("");
    const [secenek, setSecenek] = useState("");
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
            dergiAdi,
            dergiSayisi,
            yil,
            kategori: secenek,
        };

        try {
            const response = await fetch("http://localhost:3001/api/editorlukEkle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Sunucu hatası.");
            }

            const result = await response.json();
            console.log("Editorlük başarıyla kaydedildi:", result);
            onSave(result);
        } catch (err) {
            console.error("Editorlük kaydı hatası:", err);
            alert("Editorlük kaydı sırasında bir hata oluştu.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">
                Editörlük, Yayın Kurulu Üyeliği ve Hakemlik Faaliyetleri
            </h2>

            <input
                type="text"
                placeholder="Derginin Adı"
                value={dergiAdi}
                onChange={(e) => setDergiAdi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Derginin Sayısı"
                value={dergiSayisi}
                onChange={(e) => setDergiSayisi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Yılı"
                value={yil}
                onChange={(e) => setYil(e.target.value)}
                className="border p-2 rounded"
            />

            <label htmlFor="secenek" className="block font-semibold mt-4">
                Kategori Seçiniz
            </label>
            <select
                id="secenek"
                value={secenek}
                onChange={(e) => setSecenek(e.target.value)}
                className="border p-2 rounded w-full mt-2"
            >
                <option value="">Seçiniz</option>
                {secenekler.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
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

export default EditorlukForm;
