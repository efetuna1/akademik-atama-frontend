import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
    onSave: (data: any) => void;
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

    const [kullaniciId, setKullaniciId] = useState<number | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setKullaniciId(parseInt(userId));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!kullaniciId) {
            alert("Kullanıcı ID'si bulunamadı.");
            return;
        }

        const payload = {
            kullaniciId,
            ...form,
        };

        try {
            const response = await fetch("http://localhost:3001/api/toplantiEkle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Sunucu hatası oluştu.");
            }

            const result = await response.json();
            console.log("Toplantı başarıyla eklendi:", result);
            onSave(result);
        } catch (error) {
            console.error("Toplantı ekleme hatası:", error);
            alert("Toplantı kaydedilemedi. Lütfen tekrar deneyin.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full md:w-3/4 lg:w-2/3 xl:w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Bilimsel Toplantı Faaliyeti</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="yazar" type="text" placeholder="Yazar" onChange={handleChange} value={form.yazar} className="border p-2 rounded " />
                <input name="bildiriAdi" type="text" placeholder="Bildiri Adı" onChange={handleChange} value={form.bildiriAdi} className="border p-2 rounded" />
                <input name="konferansAdi" type="text" placeholder="Konferans Adı" onChange={handleChange} value={form.konferansAdi} className="border p-2 rounded" />
                <input name="yapildigiYer" type="text" placeholder="Yapıldığı Yer" onChange={handleChange} value={form.yapildigiYer} className="border p-2 rounded" />
                <input name="sayfaSayisi" type="text" placeholder="Sayfa Sayısı" onChange={handleChange} value={form.sayfaSayisi} className="border p-2 rounded" />
                <input name="tarih" type="date" onChange={handleChange} value={form.tarih} className="border p-2 rounded" />
            </div>

            <h2 className="block font-semibold mt-8">Lütfen Kategori Seçiniz</h2>
            <select name="kategori" onChange={handleChange} value={form.kategori} className="border p-2 rounded w-full mt-2">
                {kategoriListesi.map((k, i) => (
                    <option key={i} value={k}>{k}</option>
                ))}
            </select>

            <Button type="submit" className="bg-blue-600 text-white w-full mt-6 py-2 rounded hover:bg-blue-700">
                Kaydet
            </Button>
        </form>
    );
}
