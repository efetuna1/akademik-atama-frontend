import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface KitapFormProps {
    onSave: (data: any) => void;
}

const KitapForm: React.FC<KitapFormProps> = ({ onSave }) => {
    const [kitap, setKitap] = useState({
        yazarAdi: "",
        kitapAdi: "",
        yayinevi: "",
        baskiSayisi: "",
        yayimYeri: "",
        yil: "",
        secenek: "",
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
        setKitap((prev) => ({
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
            ...kitap,
            kullaniciId,
        };

        try {
            const response = await fetch("http://localhost:3001/api/kitapEkle", {
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
            console.log("Kitap başarıyla kaydedildi:", result);
            onSave(result);
        } catch (error) {
            console.error("Kitap gönderilirken hata oluştu:", error);
            alert("Kitap kaydedilemedi. Lütfen tekrar deneyin.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:w-3/4 lg:w-2/3 xl:w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Kitap Bilgileri</h2>

            <input
                type="text"
                name="yazarAdi"
                placeholder="Yazar Adı"
                value={kitap.yazarAdi}
                onChange={handleChange}
                className="border p-2 rounded lg:w-full"
            />
            <input
                type="text"
                name="kitapAdi"
                placeholder="Kitap Adı"
                value={kitap.kitapAdi}
                onChange={handleChange}
                className="border p-2 rounded lg:w-full"
            />
            <input
                type="text"
                name="yayinevi"
                placeholder="Yayınevi"
                value={kitap.yayinevi}
                onChange={handleChange}
                className="border p-2 rounded lg:w-full"
            />
            <input
                type="text"
                name="baskiSayisi"
                placeholder="Baskı Sayısı"
                value={kitap.baskiSayisi}
                onChange={handleChange}
                className="border p-2 rounded lg:w-full"
            />
            <input
                type="text"
                name="yayimYeri"
                placeholder="Yayımlandığı Yer"
                value={kitap.yayimYeri}
                onChange={handleChange}
                className="border p-2 rounded lg:w-full"
            />
            <input
                type="text"
                name="yil"
                placeholder="Yıl"
                value={kitap.yil}
                onChange={handleChange}
                className="border p-2 rounded lg:w-full"
            />

            <div>
                <label htmlFor="secenek" className="block font-semibold mt-4">Lütfen Kategori Seçiniz</label>
                <select
                    name="secenek"
                    value={kitap.secenek}
                    onChange={handleChange}
                    className="border p-2 rounded lg:w-full mt-2"
                >
                    <option value="">Seçiniz</option>
                    <option value="1">Uluslararası yayınevleri tarafından yayımlanmış özgün kitap</option>
                    <option value="2">Uluslararası yayınevleri tarafından yayımlanmış özgün kitap editörlüğü, bölüm yazarlığı</option>
                    <option value="3">Uluslararası yayımlanan ansiklopedi konusu/maddesi</option>
                    <option value="4">Ulusal yayınevleri tarafından yayımlanmış özgün kitap</option>
                    <option value="5">Ulusal yayınevleri tarafından yayımlanmış özgün kitap editörlüğü, bölüm yazarlığı</option>
                    <option value="6">Tam kitap çevirisi</option>
                    <option value="7">Çeviri kitap editörlüğü, kitap bölümü çevirisi</option>
                    <option value="8">Alanında ulusal yayımlanan ansiklopedi konusu/maddesi</option>
                </select>
            </div>

            <div className="mt-4 flex justify-center">
                <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Kaydet
                </Button>
            </div>
        </form>
    );
};

export default KitapForm;
