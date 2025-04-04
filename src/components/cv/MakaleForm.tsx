

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Makale {
    yazarAdi: string;
    makaleAdi: string;
    dergiAdi: string;
    ciltNo: string;
    sayfaSayisi: string;
    yil: string;
    kategori: string;
}
interface MakaleFormProps {
    onSave: (data: any) => void;
}

const makaleKategorileri = [
    "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q1 olarak taranan dergide)",
    "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q2 olarak taranan dergide)",
    "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q3 olarak taranan dergide)",
    "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q4 olarak taranan dergide)",
    "ESCI tarafından taranan dergilerde yayımlanmış makale",
    "Scopus tarafından taranan dergilerde yayımlanmış makale",
    "Uluslararası diğer indekslerde taranan dergilerde yayımlanmış makale",
    "ULAKBİM TR Dizin tarafından taranan ulusal hakemli dergilerde yayımlanmış makale",
    "8. madde dışındaki ulusal hakemli dergilerde yayımlanmış makale",
];

export default function MakaleForm({ onSave }: MakaleFormProps) {
    const [isMakaleFormOpen, setIsMakaleFormOpen] = useState(false);
    const [makale, setMakale] = useState<Makale>({
        yazarAdi: "",
        makaleAdi: "",
        dergiAdi: "",
        ciltNo: "",
        sayfaSayisi: "",
        yil: "",
        kategori: makaleKategorileri[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setMakale((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Makale Verileri:", makale);
        onSave(FormData); // Modal'ı kapat
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:w-3/4 lg:w-2/3 xl:w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Makale Bilgileri</h2>

            <input
                type="text"
                name="yazarAdi"
                placeholder="Yazar Adı"
                value={makale.yazarAdi}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <input
                type="text"
                name="makaleAdi"
                placeholder="Makale Adı"
                value={makale.makaleAdi}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <input
                type="text"
                name="dergiAdi"
                placeholder="Dergi Adı"
                value={makale.dergiAdi}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <input
                type="text"
                name="ciltNo"
                placeholder="Cilt No"
                value={makale.ciltNo}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <input
                type="text"
                name="sayfaSayisi"
                placeholder="Sayfa Sayısı"
                value={makale.sayfaSayisi}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <input
                type="text"
                name="yil"
                placeholder="Yıl"
                value={makale.yil}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            {/* Dropdown Menü */}
            <select name="kategori" value={makale.kategori} onChange={handleChange} className="border p-2 rounded w-full mt-4">
                {makaleKategorileri.map((kategori, index) => (
                    <option key={index} value={kategori}>
                        {kategori}
                    </option>
                ))}
            </select>
            <Button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
                Kaydet
            </Button>
        </form>
    );
}
