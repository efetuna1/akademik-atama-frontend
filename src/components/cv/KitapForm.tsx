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
        <form onSubmit={handleSubmit} className="items-center flex flex-col gap-2 w-full  xl:w-half p-6 bg-white rounded-lg shadow-lg">
            <div>
                <label htmlFor="yazarAdi" className="block font-semibold">Yazar Adı</label>
                <input
                    type="text"
                    id="yazarAdi"
                    value={yazarAdi}
                    onChange={(e) => setYazarAdi(e.target.value)}
                    className="justify-center mt-2 p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="kitapAdi" className="block font-semibold">Kitap Adı</label>
                <input
                    type="text"
                    id="kitapAdi"
                    value={kitapAdi}
                    onChange={(e) => setKitapAdi(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="yayinevi" className="block font-semibold">Yayınevi</label>
                <input
                    type="text"
                    id="yayinevi"
                    value={yayinevi}
                    onChange={(e) => setYayinevi(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="baskiSayisi" className="block font-semibold">Baskı Sayısı</label>
                <input
                    type="text"
                    id="baskiSayisi"
                    value={baskiSayisi}
                    onChange={(e) => setBaskiSayisi(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="yayimYeri" className="block font-semibold">Yayımlandığı Yer</label>
                <input
                    type="text"
                    id="yayimYeri"
                    value={yayimYeri}
                    onChange={(e) => setYayimYeri(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="yil" className="block font-semibold">Yıl</label>
                <input
                    type="text"
                    id="yil"
                    value={yil}
                    onChange={(e) => setYil(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label htmlFor="secenek" className="block font-semibold">Kitap Seçeneği</label>
                <select
                    id="secenek"
                    value={secenek}
                    onChange={(e) => setSecenek(e.target.value)}
                    className="w-50 mt-2 p-2 border border-gray-400 rounded"
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
