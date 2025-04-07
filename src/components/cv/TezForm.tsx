// components/cv/TezForm.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface TezFormProps {
    onSave: (data: any) => void;
}

const TezForm: React.FC<TezFormProps> = ({ onSave }) => {
    const [ogrenciAdi, setOgrenciAdi] = useState("");
    const [tezAdi, setTezAdi] = useState("");
    const [enstitu, setEnstitu] = useState("");
    const [yil, setYil] = useState("");
    const [kategori, setKategori] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            ogrenciAdi,
            tezAdi,
            enstitu,
            yil,
            kategori,
        };

        onSave(data);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Tez Yöneticiliği</h2>

            <input
                type="text"
                placeholder="Öğrenci Adı"
                value={ogrenciAdi}
                onChange={(e) => setOgrenciAdi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Tezin Adı"
                value={tezAdi}
                onChange={(e) => setTezAdi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Enstitüsü"
                value={enstitu}
                onChange={(e) => setEnstitu(e.target.value)}
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
