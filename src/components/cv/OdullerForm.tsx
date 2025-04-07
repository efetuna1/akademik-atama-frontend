// components/cv/OdullerForm.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface OdullerFormProps {
    onSave: (data: any) => void;
}

const OdullerForm: React.FC<OdullerFormProps> = ({ onSave }) => {
    const [kurumAdi, setKurumAdi] = useState("");
    const [yil, setYil] = useState("");
    const [secenek, setSecenek] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            kurumAdi,
            yil,
            secenek,
        };

        onSave(data);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Ödüller</h2>

            <input
                type="text"
                placeholder="Ödülün Veren Kurul/Kurumun Adı"
                value={kurumAdi}
                onChange={(e) => setKurumAdi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Yılı"
                value={yil}
                onChange={(e) => setYil(e.target.value)}
                className="border p-2 rounded"
            />

            <div>
                <label htmlFor="secenek" className="block font-semibold mt-4">Kategori Seçiniz</label>
                <select
                    id="secenek"
                    value={secenek}
                    onChange={(e) => setSecenek(e.target.value)}
                    className="border p-2 rounded w-full mt-2"
                >
                    <option value="">Seçiniz</option>
                    <option value="1">Sürekli ve Periyodik olarak Jürili Uluslararası Bilim ve Sanat Ödülleri</option>
                    <option value="2">TÜBİTAK Tarafından Verilen Bilim, Özel ve Hizmet Ödülleri</option>
                    <option value="3">TÜBA Tarafından Verilen Akademi Ödülleri</option>
                    <option value="4">TÜBİTAK Tarafından Verilen Teşvik Ödülü (Yayın Teşvik Ödülü Hariç)</option>
                    <option value="5">TÜBA Tarafından Verilen GEBİP ve TESEP Ödülleri</option>
                    <option value="6">Sürekli ve Periyodik Olarak Jürili Ulusal Bilim ve Sanat Ödülleri</option>
                    <option value="7">Sürekli ve Periyodik Olarak Verilen ve Bir Jüri Değerlendirmesine Tabi Olmayan Uluslararası/Ulusal Ödüller</option>
                    <option value="8">Uluslararası Hakemli Yarışmalarda Birincilik Derecesi</option>
                    <option value="9">Uluslararası Hakemli Yarışmalarda İkincilik Derecesi</option>
                    <option value="10">Uluslararası Hakemli Yarışmalarda Üçüncülük Derecesi</option>
                    <option value="11">Ulusal Hakemli Yarışmalarda Birincilik Derecesi</option>
                    <option value="12">Ulusal Hakemli Yarışmalarda İkincilik Derecesi</option>
                    <option value="13">Ulusal Hakemli Yarışmalarda Üçüncülük Ödül Derecesi</option>
                    <option value="14">Uluslararası Bilimsel Toplantılarda Alınan Ödüller</option>
                    <option value="15">Ulusal Bilimsel Toplantılarda Alınan Ödüller</option>
                    <option value="16">Sanat, Tasarım ve Mimarlık Alanlarında Uluslararası Hakemli Yarışmalarda Alınan Ödüller</option>
                    <option value="17">Sanat, Tasarım ve Mimarlık Alanlarında Ulusal Hakemli Yarışmalarda Alınan Ödüller</option>
                    <option value="18">KOU Kurumsal Ödülleri (Üniversite Genelinde İlgili Alanda Dereceye Girenler)</option>
                    <option value="19">Kitap veya Makale Gibi Bilimsel Eserlere Atfedilen Ödüller</option>
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
