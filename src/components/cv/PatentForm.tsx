// components/cv/PatentForm.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface PatentFormProps {
    onSave: (data: any) => void;
}

const PatentForm: React.FC<PatentFormProps> = ({ onSave }) => {
    const [patentAdi, setPatentAdi] = useState("");
    const [yil, setYil] = useState("");
    const [kategori, setKategori] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            patentAdi,
            yil,
            kategori,
        };

        onSave(data);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Patent Bilgisi</h2>

            <input
                type="text"
                placeholder="Patent Adı"
                value={patentAdi}
                onChange={(e) => setPatentAdi(e.target.value)}
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
                <label htmlFor="kategori" className="block font-semibold mt-4">Kategori</label>
                <select
                    id="kategori"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="border p-2 rounded w-full mt-2"
                >
                    <option value="">Seçiniz</option>
                    <option value="1">Lisanslanan Uluslararası Patent</option>
                    <option value="2">Tescillenmiş Uluslararası Patent</option>
                    <option value="3">Uluslararası Patent Başvurusu</option>
                    <option value="4">Lisanslanan Ulusal Patent</option>
                    <option value="5">Tescillenmiş Ulusal Patent</option>
                    <option value="6">Ulusal Patent Başvurusu</option>
                    <option value="7">Lisanslanan Faydalı Model, Endüstriyel Tasarım, Marka</option>
                    <option value="8">Faydalı Model ve Endüstriyel Tasarım</option>
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

export default PatentForm;
