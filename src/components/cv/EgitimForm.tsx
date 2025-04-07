// components/cv/EgitimForm.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface EgitimFormProps {
    onSave: (data: any) => void;
}

const EgitimForm: React.FC<EgitimFormProps> = ({ onSave }) => {
    const [dersAdi, setDersAdi] = useState("");
    const [programAdi, setProgramAdi] = useState("");
    const [donem, setDonem] = useState("");
    const [yil, setYil] = useState("");
    const [secenek, setSecenek] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            dersAdi,
            programAdi,
            donem,
            yil,
            secenek,
        };

        onSave(data);
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

            <div>
                <label htmlFor="secenek" className="block font-semibold mt-4">Kategori Seçiniz</label>
                <select
                    id="secenek"
                    value={secenek}
                    onChange={(e) => setSecenek(e.target.value)}
                    className="border p-2 rounded w-full mt-2"
                >
                    <option value="">Seçiniz</option>
                    <option value="1">Önlisans / Lisans Dersleri</option>
                    <option value="2">Önlisans / Lisans Dersleri (Yabancı dilde)</option>
                    <option value="3">Lisansüstü Dersleri</option>
                    <option value="4">Lisansüstü Dersleri (Yabancı dilde)</option>
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

export default EgitimForm;
