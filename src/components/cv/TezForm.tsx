import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface TezFormProps {
    onSave: (data: any) => void;
}

const TezForm: React.FC<TezFormProps> = ({ onSave }) => {
    const [form, setForm] = useState({
        ogrenciAdi: "",
        tezAdi: "",
        enstitu: "",
        yil: "",
        kategori: "",
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
        setForm((prev) => ({
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
            ...form,
            kullaniciId,
        };

        try {
            const response = await fetch("http://localhost:3001/api/tezEkle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Sunucu hatası oluştu.");
            }

            const result = await response.json();
            console.log("Tez kaydedildi:", result);
            onSave(result);
        } catch (error) {
            console.error("Tez eklenirken hata oluştu:", error);
            alert("Tez kaydedilemedi. Lütfen tekrar deneyiniz.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Tez Yöneticiliği</h2>

            <input
                type="text"
                name="ogrenciAdi"
                placeholder="Öğrenci Adı"
                value={form.ogrenciAdi}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                type="text"
                name="tezAdi"
                placeholder="Tezin Adı"
                value={form.tezAdi}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                type="text"
                name="enstitu"
                placeholder="Enstitüsü"
                value={form.enstitu}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                type="text"
                name="yil"
                placeholder="Yılı"
                value={form.yil}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <div>
                <label htmlFor="kategori" className="block font-semibold mt-4">Kategori</label>
                <select
                    name="kategori"
                    value={form.kategori}
                    onChange={handleChange}
                    className="border p-2 rounded w-full mt-2"
                >
                    <option value="">Seçiniz</option>
                    <option value="1">Doktora/Sanatta Yeterlik veya Tıp/Diş Hekimliğinde Uzmanlık tez yönetimi</option>
                    <option value="2">Yüksek Lisans Tez Yönetimi</option>
                    <option value="3">Doktora/Sanatta Yeterlik (Eş Danışman)</option>
                    <option value="4">Yüksek Lisans/Sanatta Yeterlik Tez Yönetimi (Eş Danışman)</option>
                </select>
            </div>

            <div className="mt-4 flex justify-center">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Kaydet
                </Button>
            </div>
        </form>
    );
};

export default TezForm;
