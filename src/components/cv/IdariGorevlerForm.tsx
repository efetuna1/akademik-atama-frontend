// components/cv/IdariGorevlerForm.tsx

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface IdariGorevlerFormProps {
    onSave: (data: any) => void;
}

const idariSecenekler = [
    "Dekan/Enstitü/Yüksekokul/MYO/Merkez Müdürü",
    "Enstitü Müdür Yrd. / Dekan Yrd. / Yüksekokul Müdür Yrd. / MYO Müdür Yrd. / Merkez Müdürü Yrd. / Bölüm Başkanı",
    "Bölüm Başkan Yrd. / Anabilim Dalı Başkanı",
    "Rektörlükçe Görevlendirilen Koordinatörlük",
    "Rektörlükçe Görevlendirilen Koordinatör Yardımcıları",
    "Rektörlükçe Görevlendirilen Üniversite Düzeyinde Komisyon/Kurul Üyelikleri",
    "Dekanlık/Y.O. Müdürlüğü/MYO Müdürlüğü/Konservatuvar Müdürlüğü Tarafından Görevlendirilen Komisyon/Kurul Üyelikleri",
    "Bölüm Başkanlıkları Tarafından Görevlendirilen Komisyon/Kurul Üyelikleri",
    "Rektörlük/Dekanlık/... Görevlendirmeleriyle Kurum İçi ve Dışı Eğitim, İşbirliği vb. Konularda Katkı Sağlamak",
    "Uluslararası Bilimsel ve Mesleki Kurum/Kuruluş Yönetimi veya Kurulları",
    "Ulusal Bilimsel ve Mesleki Kurum/Kuruluş Yönetimi veya Kurulları",
    "Yerel Bilimsel ve Mesleki Kurum/Kuruluş Yönetimi veya Kurulları",
];

const IdariGorevlerForm: React.FC<IdariGorevlerFormProps> = ({ onSave }) => {
    const [form, setForm] = useState({
        gorevBirimi: "",
        yil: "",
        secenek: idariSecenekler[0],
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
            kullaniciId,
            gorevBirimi: form.gorevBirimi,
            yil: form.yil,
            kategori: form.secenek,
        };

        try {
            const response = await fetch("http://localhost:3001/api/idariGorevEkle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Sunucu hatası");
            }

            const result = await response.json();
            console.log("İdari görev kaydedildi:", result);
            onSave(result);
        } catch (error) {
            console.error("Kayıt hatası:", error);
            alert("Görev kaydedilemedi. Lütfen tekrar deneyin.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">İdari Görevler ve Üniversiteye Katkı</h2>

            <input
                type="text"
                name="gorevBirimi"
                placeholder="Görev Birimi"
                value={form.gorevBirimi}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <input
                type="number"
                name="yil"
                placeholder="Yıl"
                value={form.yil}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <select
                name="secenek"
                value={form.secenek}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            >
                {idariSecenekler.map((secenek, index) => (
                    <option key={index} value={secenek}>
                        {secenek}
                    </option>
                ))}
            </select>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Kaydet
            </Button>
        </form>
    );
};

export default IdariGorevlerForm;
