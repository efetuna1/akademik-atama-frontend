

import { useState } from "react";

type ToplantiKategori =
    | "Uluslararası bilimsel toplantılarda sözlü olarak sunulan, tam metni yayımlanmış"
    | "Uluslararası bilimsel toplantılarda sözlü olarak sunulan, özet metni yayımlanmış"
    | "Uluslararası bilimsel toplantılarda poster olarak sunulan çalışmalar"
    | "Ulusal bilimsel toplantılarda sözlü, tam metni yayımlanmış"
    | "Ulusal bilimsel toplantılarda sözlü, özet metni yayımlanmış"
    | "Ulusal bilimsel toplantılarda poster olarak sunulan çalışmalar"
    | "Uluslararası organizasyon, yürütme veya bilim kurulu üyeliği"
    | "Ulusal organizasyon, yürütme veya bilim kurulu üyeliği"
    | "Uluslararası konferanslarda davetli konuşmacı"
    | "Ulusal konferanslarda davetli konuşmacı"
    | "Uluslararası veya ulusal işbirliğiyle organizasyon gerçekleştirmek"
    | "Uluslararası veya ulusal işbirliğiyle konuşmacı veya panelist olmak";

interface ToplantiFormData {
    yazar: string;
    bildiriAdi: string;
    konferansAdi: string;
    yapildigiYer: string;
    sayfaSayisi: string;
    tarih: string;
    kategori: ToplantiKategori;
}

interface Props {
    onSave: (data: ToplantiFormData) => void;
}

const kategoriListesi: ToplantiKategori[] = [
    "Uluslararası bilimsel toplantılarda sözlü olarak sunulan, tam metni yayımlanmış",
    "Uluslararası bilimsel toplantılarda sözlü olarak sunulan, özet metni yayımlanmış",
    "Uluslararası bilimsel toplantılarda poster olarak sunulan çalışmalar",
    "Ulusal bilimsel toplantılarda sözlü, tam metni yayımlanmış",
    "Ulusal bilimsel toplantılarda sözlü, özet metni yayımlanmış",
    "Ulusal bilimsel toplantılarda poster olarak sunulan çalışmalar",
    "Uluslararası organizasyon, yürütme veya bilim kurulu üyeliği",
    "Ulusal organizasyon, yürütme veya bilim kurulu üyeliği",
    "Uluslararası konferanslarda davetli konuşmacı",
    "Ulusal konferanslarda davetli konuşmacı",
    "Uluslararası veya ulusal işbirliğiyle organizasyon gerçekleştirmek",
    "Uluslararası veya ulusal işbirliğiyle konuşmacı veya panelist olmak"
];

export default function BilimselToplantiForm({ onSave }: Props) {
    const [form, setForm] = useState<ToplantiFormData>({
        yazar: "",
        bildiriAdi: "",
        konferansAdi: "",
        yapildigiYer: "",
        sayfaSayisi: "",
        tarih: "",
        kategori: kategoriListesi[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Bilimsel Toplantı Verisi:", form);
        onSave(form);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full md:w-3/4 lg:w-2/3 xl:w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Bilimsel Toplantı Faaliyeti</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="yazar" type="text" placeholder="Yazar" onChange={handleChange} className="border p-2 rounded " />
                <input name="bildiriAdi" type="text" placeholder="Bildiri Adı" onChange={handleChange} className="border p-2 rounded" />
                <input name="konferansAdi" type="text" placeholder="Konferans Adı" onChange={handleChange} className="border p-2 rounded" />
                <input name="yapildigiYer" type="text" placeholder="Yapıldığı Yer" onChange={handleChange} className="border p-2 rounded" />
                <input name="sayfaSayisi" type="text" placeholder="Sayfa Sayısı" onChange={handleChange} className="border p-2 rounded" />
                <input name="tarih" type="date" onChange={handleChange} className="border p-2 rounded" />
            </div>

            <select name="kategori" onChange={handleChange} className="border p-2 rounded w-full mt-4">
                {kategoriListesi.map((k, i) => (
                    <option key={i} value={k}>{k}</option>
                ))}
            </select>

            <button type="submit" className="bg-blue-500 text-white py-2 rounded w-full mt-4 hover:bg-blue-700">
                Kaydet
            </button>
        </form>
    );
}
