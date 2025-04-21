import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface OdullerFormProps {
    onSave: (data: any) => void;
}

const OdullerForm: React.FC<OdullerFormProps> = ({ onSave }) => {
    const [form, setForm] = useState({
        kurumAdi: "",
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
            const response = await fetch("http://localhost:3001/api/odulEkle", {
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
            console.log("Ödül başarıyla kaydedildi:", result);
            onSave(result);
        } catch (error) {
            console.error("Ödül kaydı sırasında hata oluştu:", error);
            alert("Ödül kaydedilemedi. Lütfen tekrar deneyin.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Ödüller</h2>

            <input
                type="text"
                name="kurumAdi"
                placeholder="Ödülün Veren Kurul/Kurumun Adı"
                value={form.kurumAdi}
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
                <label htmlFor="secenek" className="block font-semibold mt-4">Kategori Seçiniz</label>
                <select
                    name="secenek"
                    value={form.secenek}
                    onChange={handleChange}
                    className="border p-2 rounded w-full mt-2"
                >
                    <option value="">Seçiniz</option>
                    <option value="1">Sürekli ve Periyodik olarak Jürili Uluslararası Bilim ve Sanat Ödülleri</option>
                    <option value="2">TÜBİTAK Tarafından Verilen Bilim, Özel ve Hizmet Ödülleri</option>
                    <option value="3">TÜBA Tarafından Verilen Akademi Ödülleri</option>
                    <option value="4">TÜBİTAK Tarafından Verilen Teşvik Ödülü (Yayın Teşvik Ödülü Hariç)</option>
                    <option value="5">TÜBA Tarafından Verilen GEBİP ve TESEP Ödülleri</option>
                    <option value="6">Sürekli ve Periyodik Olarak Jürili Ulusal Bilim ve Sanat Ödülleri</option>
                    <option value="7">Jürili Olmayan Uluslararası/Ulusal Ödüller</option>
                    <option value="8">Uluslararası Hakemli Yarışmalarda Birincilik Derecesi</option>
                    <option value="9">Uluslararası Hakemli Yarışmalarda İkincilik Derecesi</option>
                    <option value="10">Uluslararası Hakemli Yarışmalarda Üçüncülük Derecesi</option>
                    <option value="11">Ulusal Hakemli Yarışmalarda Birincilik Derecesi</option>
                    <option value="12">Ulusal Hakemli Yarışmalarda İkincilik Derecesi</option>
                    <option value="13">Ulusal Hakemli Yarışmalarda Üçüncülük Derecesi</option>
                    <option value="14">Uluslararası Bilimsel Toplantılarda Alınan Ödüller</option>
                    <option value="15">Ulusal Bilimsel Toplantılarda Alınan Ödüller</option>
                    <option value="16">Sanat, Tasarım ve Mimarlık - Uluslararası Yarışmalar</option>
                    <option value="17">Sanat, Tasarım ve Mimarlık - Ulusal Yarışmalar</option>
                    <option value="18">KOU Kurumsal Ödülleri</option>
                    <option value="19">Bilimsel Eserlere Atfedilen Ödüller</option>
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

export default OdullerForm;
