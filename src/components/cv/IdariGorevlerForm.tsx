// components/cv/IdariGorevlerForm.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface IdariGorevlerFormProps {
    onSave: (data: any) => void;
}

const IdariGorevlerForm: React.FC<IdariGorevlerFormProps> = ({ onSave }) => {
    const [gorevBirimi, setGorevBirimi] = useState("");
    const [yil, setYil] = useState("");
    const [secenek, setSecenek] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            gorevBirimi,
            yil,
            secenek,
        };

        onSave(data);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">İdari Görevler ve Üniversiteye Katkı Faaliyetleri</h2>

            <input
                type="text"
                placeholder="Görev Birimi"
                value={gorevBirimi}
                onChange={(e) => setGorevBirimi(e.target.value)}
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
                    <option value="1">Dekan/Enstitü/Yüksekokul/MYO/Merkez Müdürü</option>
                    <option value="2">Enstitü Müdür Yrd. / Dekan Yrd. / Yüksekokul Müdür Yrd. / MYO Müdür Yrd. / Merkez Müdürü Yrd. / Bölüm Başkanı</option>
                    <option value="3">Bölüm Başkan Yrd. / Anabilim Dalı Başkanı</option>
                    <option value="4">Rektörlükçe Görevlendirilen Koordinatörlük</option>
                    <option value="5">Rektörlükçe Görevlendirilen Koordinatör Yardımcıları</option>
                    <option value="6">Rektörlükçe Görevlendirilen Üniversite Düzeyinde Komisyon/Kurul Üyelikleri</option>
                    <option value="7">Dekanlık/Y.O. Müdürlüğü/MYO Müdürlüğü/Konservatuvar Müdürlüğü Tarafından Görevlendirilen Komisyon/Kurul Üyelikleri</option>
                    <option value="8">Bölüm Başkanlıkları Tarafından Görevlendirilen Komisyon/Kurul Üyelikleri</option>
                    <option value="9">Rektörlük/Dekanlık/Y.O. Müdürlüğü/MYO Müdürlüğü/Konservatuvar Müdürlüğü/Bölüm Başkanlığı Görevlendirmeleriyle Kurum İçi ve Dışı Eğitim, İşbirliği vb. Konularda Katkı Sağlamak</option>
                    <option value="10">Uluslararası Nitelikteki Bilimsel ve Mesleki Kurum/Kuruluşların Yönetimlerinde, Kurullarında, Komisyon veya Komitelerinde Görev Almak</option>
                    <option value="11">Ulusal Nitelikteki Bilimsel ve Mesleki Kurum/Kuruluşların Yönetimlerinde, Kurullarında, Komisyon veya Komitelerinde Görev Almak</option>
                    <option value="12">Yerel Nitelikteki Bilimsel ve Mesleki Kurum/Kuruluşların Yönetimlerinde, Kurullarında, Komisyon veya Komitelerinde Görev Almak</option>
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

export default IdariGorevlerForm;
