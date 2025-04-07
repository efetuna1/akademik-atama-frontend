import React, { useState } from "react";
import { Button } from "@/components/ui/button";


interface AtifFormProps {
    onSave: (data: any) => void;
}

const AtifForm: React.FC<AtifFormProps> = ({ onSave }) => {
    const [eser, setEser] = useState("");
    const [sayi, setSayi] = useState("");
    const [secenek, setSecenek] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            eser,
            sayi,
            secenek,
        };

        onSave(data);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:w-3/4 lg:w-2/3 xl:w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Atıf Bilgileri</h2>

            <div>
                <input
                    type="text"
                    id="eser"
                    placeholder="Atıfın Yapıldığı Eser"
                    value={eser}
                    onChange={(e) => setEser(e.target.value)}
                    className="border p-2 rounded lg:w-full"
                />
            </div>

            <div>
                <input
                    type="number"
                    id="sayi"
                    placeholder="Atıf Sayısı"
                    value={sayi}
                    onChange={(e) => setSayi(e.target.value)}
                    className="border p-2 rounded lg:w-full"
                />
            </div>

            <div>
                <label htmlFor="secenek" className="block font-semibold mt-4">Lütfen Atıf Türünü Seçiniz</label>
                <select
                    id="secenek"
                    value={secenek}
                    onChange={(e) => setSecenek(e.target.value)}
                    className="border p-2 rounded lg:w-full mt-2"
                >
                    <option value="">Seçiniz</option>
                    <option value="1">SCI-E, SSCI ve AHCI dergilerde / Uluslararası yayınevlerinden kitaplarda yayımlanmış ve adayın yazar olmadığı yayınlardan</option>
                    <option value="2">E-SCI dergilerde ve adayın yazar olmadığı yayınlardan</option>
                    <option value="3">Diğer uluslararası indeksli dergilerde veya kitap bölümlerinde yayımlanmış, adayın yazar olmadığı yayınlardan</option>
                    <option value="4">Ulusal hakemli dergilerde / Ulusal yayınevlerinden kitaplarda yayımlanmış, adayın yazar olmadığı yayınlardan</option>
                    <option value="5">Güzel sanatlarda uluslararası kaynakta yayımlanmış ya da gösterime girmiş eserler</option>
                    <option value="6">Güzel sanatlarda ulusal kaynakta yayımlanmış ya da gösterime girmiş eserler</option>
                </select>
            </div>

            <div className="mt-4 flex justify-center gap-4">
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

export default AtifForm;
