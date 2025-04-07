import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface KitapFormProps {
    onSave: (data: any) => void;
}

const KitapForm: React.FC<KitapFormProps> = ({ onSave }) => {
    const [yazarAdi, setYazarAdi] = useState("");
    const [kitapAdi, setKitapAdi] = useState("");
    const [yayinevi, setYayinevi] = useState("");
    const [baskiSayisi, setBaskiSayisi] = useState("");
    const [yayimYeri, setYayimYeri] = useState("");
    const [yil, setYil] = useState("");
    const [secenek, setSecenek] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            yazarAdi,
            kitapAdi,
            yayinevi,
            baskiSayisi,
            yayimYeri,
            yil,
            secenek,
        };

        onSave(data);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:w-3/4 lg:w-2/3 xl:w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Kitap Bilgileri</h2>
            <div>
                <input
                    type="text"
                    id="yazarAdi"
                    value={yazarAdi}
                    placeholder="Yazar Adı"
                    onChange={(e) => setYazarAdi(e.target.value)}
                    className="border p-2 rounded lg:w-full"
                />
            </div>
            <div>
                <input
                    type="text"
                    id="kitapAdi"
                    placeholder="Kitap Adı"
                    value={kitapAdi}
                    onChange={(e) => setKitapAdi(e.target.value)}
                    className="border p-2 rounded lg:w-full"
                />
            </div>
            <div>
                <input
                    type="text"
                    id="yayinevi"
                    placeholder="Yayınevi"
                    value={yayinevi}
                    onChange={(e) => setYayinevi(e.target.value)}
                    className="border p-2 rounded lg:w-full"
                />
            </div>
            <div>
                <input
                    type="text"
                    id="baskiSayisi"
                    placeholder="Baskı Sayısı"
                    value={baskiSayisi}
                    onChange={(e) => setBaskiSayisi(e.target.value)}
                    className="border p-2 rounded lg:w-full"
                />
            </div>
            <div>
                <input
                    type="text"
                    id="yayimYeri"
                    placeholder="Yayımlandığı Yer"
                    value={yayimYeri}
                    onChange={(e) => setYayimYeri(e.target.value)}
                    className="border p-2 rounded lg:w-full"
                />
            </div>
            <div>
                <input
                    type="text"
                    id="yil"
                    placeholder="Yıl"
                    value={yil}
                    onChange={(e) => setYil(e.target.value)}
                    className="border p-2 rounded lg:w-full"
                />
            </div>

            <div>
                <label htmlFor="secenek" className="block font-semibold mt-4">Lütfen Kategori Seçiniz</label>
                <select
                    id="secenek"
                    value={secenek}
                    onChange={(e) => setSecenek(e.target.value)}
                    className="border p-2 rounded lg:w-full mt-2"
                >
                    <option value="">Seçiniz</option>
                    <option value="1">Uluslararası yayınevleri tarafından yayımlanmış özgün kitap</option>
                    <option value="2">Uluslararası yayınevleri tarafından yayımlanmış özgün kitap editörlüğü, bölüm yazarlığı</option>
                    <option value="3">Uluslararası yayımlanan ansiklopedi konusu/maddesi</option>
                    <option value="4">Ulusal yayınevleri tarafından yayımlanmış özgün kitap</option>
                    <option value="5">Ulusal yayınevleri tarafından yayımlanmış özgün kitap editörlüğü, bölüm yazarlığı</option>
                    <option value="6">Tam kitap çevirisi</option>
                    <option value="7">Çeviri kitap editörlüğü, kitap bölümü çevirisi</option>
                    <option value="8">Alanında ulusal yayımlanan ansiklopedi konusu/maddesi</option>
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

export default KitapForm;
