import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const indeksMap: { [key: string]: "SCI_E_SSCI_AHCI" | "E_SCI" | "ULUSLARARASI" | "ULUSAL" | "GUZEL_SANATLAR_ULUSLARARASI" | "GUZEL_SANATLAR_ULUSAL" } = {
    "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q1 olarak taranan dergide)": "SCI_E_SSCI_AHCI",
    "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q2 olarak taranan dergide)": "SCI_E_SSCI_AHCI",
    "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q3 olarak taranan dergide)": "SCI_E_SSCI_AHCI",
    "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q4 olarak taranan dergide)": "SCI_E_SSCI_AHCI",
    "ESCI tarafından taranan dergilerde yayımlanmış makale": "E_SCI",
    "Scopus tarafından taranan dergilerde yayımlanmış makale": "ULUSLARARASI",
    "Uluslararası diğer indekslerde taranan dergilerde yayımlanmış makale": "ULUSLARARASI",
    "ULAKBİM TR Dizin tarafından taranan ulusal hakemli dergilerde yayımlanmış makale": "ULUSAL",
    "8. madde dışındaki ulusal hakemli dergilerde yayımlanmış makale": "ULUSAL",
};

interface AtifFormProps {
    onSave: (data: any) => void;
}

const atifKategorileri = [
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

export default function AtifForm({ onSave }: AtifFormProps) {
    const [atif, setAtif] = useState({
        atifYapanEser: "",
        indeksTuru: atifKategorileri[0],
        atifSayisi: 1,
        puan: 0,
    });

    const [kullaniciId, setKullaniciId] = useState<number | null>(null);

    // Kullanıcı ID'sini localStorage'dan al
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setKullaniciId(parseInt(userId)); // Kullanıcı ID'sini set et
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAtif((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!kullaniciId) {
            alert("Kullanıcı ID'si bulunamadı.");
            return;
        }

        const payload = {
            kullaniciId,
            atifYapanEser: atif.atifYapanEser,
            atifSayisi: atif.atifSayisi,
            indeks: indeksMap[atif.indeksTuru],
            puan: atif.puan || null,
        };

        try {
            const response = await fetch("http://localhost:3001/api/atifEkle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Sunucu hatası");
            }

            const result = await response.json();
            console.log("Atıf başarıyla kaydedildi:", result);
            onSave(result); // Modal'ı kapatır
        } catch (error) {
            console.error("Atıf gönderilirken hata oluştu:", error);
            alert("Atıf kaydedilemedi. Lütfen tekrar deneyin.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Atıf Bilgileri</h2>

            <input
                type="text"
                name="atifYapanEser"
                placeholder="Atıf Yapan Eser"
                value={atif.atifYapanEser}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <input
                type="number"
                name="atifSayisi"
                placeholder="Atıf Sayısı"
                value={atif.atifSayisi}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <select
                name="indeksTuru"
                value={atif.indeksTuru}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            >
                {atifKategorileri.map((kategori, index) => (
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
