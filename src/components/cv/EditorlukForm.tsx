// components/cv/EditorlukYayinKuruluHekemlikForm.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface EditorlukFormProps {
    onSave: (data: any) => void;
}

const EditorlukForm: React.FC<EditorlukFormProps> = ({ onSave }) => {
    const [dergiAdi, setDergiAdi] = useState("");
    const [dergiSayisi, setDergiSayisi] = useState("");
    const [yil, setYil] = useState("");
    const [secenek, setSecenek] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            dergiAdi,
            dergiSayisi,
            yil,
            secenek,
        };

        onSave(data);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Editörlük, Yayın Kurulu Üyeliği ve Hakemlik Faaliyetleri</h2>

            <input
                type="text"
                placeholder="Derginin Adı"
                value={dergiAdi}
                onChange={(e) => setDergiAdi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Derginin Sayısı"
                value={dergiSayisi}
                onChange={(e) => setDergiSayisi(e.target.value)}
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
                    <option value="1">SCI-E, SSCI, AHCI veya E-SCI Kapsamındaki Dergilerde Baş Editörlük Görevinde Bulunmak</option>
                    <option value="2">SCI-E, SSCI, AHCI veya E-SCI Kapsamındaki Dergilerde Yardımcı/Ortak Editörlük Görevinde Bulunmak</option>
                    <option value="3">SCI-E, SSCI, AHCI veya E-SCI Kapsamındaki Dergilerde Asistan Editörlük Görevinde Bulunmak</option>
                    <option value="4">SCI-E, SSCI, AHCI veya E-SCI Kapsamındaki Dergilerde Yayın Kurulu Üyeliği</option>
                    <option value="5">SCI-E, SSCI, AHCI veya E-SCI Kapsamı Dışındaki Uluslararası Diğer İndeksler Tarafından Taranan Dergilerde Baş Editörlük Görevinde Bulunmak</option>
                    <option value="6">SCI-E, SSCI, AHCI veya E-SCI Kapsamı Dışındaki Uluslararası Diğer İndeksler Tarafından Taranan Dergilerde Yardımcı/Ortak Editörlük Görevinde Bulunmak</option>
                    <option value="7">SCI-E, SSCI, AHCI veya E-SCI Kapsamı Dışındaki Uluslararası Diğer İndeksler Tarafından Taranan Dergilerde Asistan Editörlük Görevinde Bulunmak</option>
                    <option value="8">SCI-E, SSCI, AHCI veya E-SCI Kapsamı Dışındaki Uluslararası Diğer İndeksler Tarafından Taranan Dergilerde Yayın Kurulu Üyeliği</option>
                    <option value="9">ULAKBİM Tarafından Taranan Dergilerde Baş Editörlük Görevi</option>
                    <option value="10">ULAKBİM Tarafından Taranan Dergilerde Yayın Kurulu Üyeliği</option>
                    <option value="11">SCI-E, SSCI veya AHCI Kapsamındaki Dergilerde Tamamlanmış Hakemlik Faaliyeti</option>
                    <option value="12">SCI-E, SSCI veya AHCI Kapsamı Dışındaki Uluslararası Diğer İndeksler Tarafından Taranan Dergilerde Tamamlanmış Hakemlik Faaliyeti</option>
                    <option value="13">ULAKBİM Tarafından Taranan Dergilerde Hakemlik Faaliyeti</option>
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

export default EditorlukForm;
