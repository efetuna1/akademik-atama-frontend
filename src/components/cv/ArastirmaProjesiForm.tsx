import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ArastirmaProjesiFormProps {
    onSave: (data: any) => void;
}

const kategoriListesi = [
    "AB Çerçeve Programı/NSF/ERC Bilimsel Araştırma Projesinde Koordinatör/Alt Koordinatör Olmak",
    "AB Çerçeve Programı/NSF/ERC Bilimsel Araştırma Projesinde Yürütücü Olmak",
    "AB Çerçeve Programı/NSF/ERC Bilimsel Araştırma Projesinde Araştırmacı Olmak",
    "AB dışı Uluslararası Destekli Projede Koordinatör/Alt Koordinatör Olmak",
    "AB dışı Uluslararası Destekli Projede Yürütücü Olmak",
    "AB dışı Uluslararası Destekli Projede Araştırmacı Olmak",
    "AB dışı Uluslararası Destekli Projede Danışman Olmak",
    "TÜBİTAK ARGE/TÜSEB Projesi Yürütücüsü",
    "Diğer TÜBİTAK Projesi Yürütücüsü",
    "Kamu Kurumu Destekli Projede Yürütücü",
    "Sanayi Projesinde Yürütücü",
    "Özel Kuruluş Ar-Ge Projesinde Yürütücü",
    "TÜBİTAK ARGE/TÜSEB Projesi Araştırmacı",
    "Diğer TÜBİTAK Projesi Araştırmacı",
    "Kamu Kurumu Destekli Projede Araştırmacı",
    "Sanayi Projesinde Araştırmacı",
    "Özel Kuruluş Ar-Ge Projesinde Araştırmacı",
    "TÜBİTAK ARGE/TÜSEB Projesi Danışman",
    "Diğer TÜBİTAK Projesi Danışman",
    "Kamu Kurumu Destekli Projede Danışman",
    "Sanayi Projesinde Danışman",
    "Özel Kuruluş Ar-Ge Projesinde Danışman",
    "BAP Projesi Yürütücüsü",
    "BAP Projesi Araştırmacı",
    "BAP Projesi Danışman",
    "4+ Ay Yurtdışı Araştırma",
    "4+ Ay Yurtiçi Araştırma",
    "TÜBİTAK 2209/2242 Danışmanı"
];

export default function ArastirmaProjesiForm({ onSave }: ArastirmaProjesiFormProps) {
    const [proje, setProje] = useState({
        projeAdi: "",
        projeNumarasi: "",
        kurumAdi: "",
        yil: "",
        kategori: kategoriListesi[0],
    });

    const [kullaniciId, setKullaniciId] = useState<number | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setKullaniciId(parseInt(userId));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProje((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!kullaniciId) {
            alert("Kullanıcı ID'si bulunamadı.");
            return;
        }

        const payload = {
            kullaniciId,
            ...proje,
        };

        try {
            const response = await fetch("http://localhost:3001/api/arastirmaProjesiEkle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Sunucu hatası");
            }

            const result = await response.json();
            console.log("Proje başarıyla kaydedildi:", result);
            onSave(result);
        } catch (error) {
            console.error("Proje gönderilirken hata oluştu:", error);
            alert("Proje kaydedilemedi. Lütfen tekrar deneyin.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Araştırma Projesi Bilgileri</h2>

            <input
                type="text"
                name="projeAdi"
                placeholder="Projenin Adı"
                value={proje.projeAdi}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                type="text"
                name="projeNumarasi"
                placeholder="Proje Numarası"
                value={proje.projeNumarasi}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                type="text"
                name="kurumAdi"
                placeholder="Yürütüldüğü Kurum"
                value={proje.kurumAdi}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                type="text"
                name="yil"
                placeholder="Yılı"
                value={proje.yil}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <select
                name="kategori"
                value={proje.kategori}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            >
                {kategoriListesi.map((kategori, index) => (
                    <option key={index} value={kategori}>
                        {kategori}
                    </option>
                ))}
            </select>

            <Button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
                Kaydet
            </Button>
        </form>
    );
}
