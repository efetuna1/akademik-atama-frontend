"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Ilan = {
  id: number;
  baslik: string;
  aciklama: string;
  kadro: "DR_OGR_UYESI" | "DOCENT" | "PROFESOR";
  baslangicTarihi: string;
  bitisTarihi: string;
  kriterler: string;
  durum: "ACIK" | "KAPALI";
  basvuruSayisi: number;
};

const IlanlarPage = () => {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [loading, setLoading] = useState(true);
  const [basvurulanIlanlar, setBasvurulanIlanlar] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/ilanGetir");
        const data = await response.json();
        setIlanlar(data);
      } catch (error) {
        console.error("İlanlar çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    const storedBasvurular = localStorage.getItem("basvurulanIlanlar");
    if (storedBasvurular) {
      setBasvurulanIlanlar(JSON.parse(storedBasvurular));
    }

    fetchIlanlar();
  }, []);

  const handleBasvuruYap = async (ilanId: number) => {
    const kullaniciId = localStorage.getItem("userId");

    if (!kullaniciId) {
      alert("Kullanıcı ID bulunamadı. Lütfen tekrar giriş yapın.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/basvuruYap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kullaniciId: parseInt(kullaniciId), ilanId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Başvuru yapılamadı");
        return;
      }

      setBasvurulanIlanlar((prev) => {
        const updatedBasvurular = [...prev, ilanId];
        localStorage.setItem("basvurulanIlanlar", JSON.stringify(updatedBasvurular));
        return updatedBasvurular;
      });

      alert("Başvuru başarıyla yapıldı!");
    } catch (error) {
      console.error("Başvuru hatası:", error);
      alert("Başvuru sırasında bir hata oluştu.");
    }
  };

  const handleProfilimClick = () => {
    router.push("/adaycv");
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="p-6">
      <div className="absolute top-5 right-9">
        <button
          onClick={handleProfilimClick}
          className="text-blue-500 hover:underline font-semibold"
        >
          Profilim
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Tüm İlanlar</h1>

      {ilanlar.length === 0 ? (
        <p>Şu anda kayıtlı ilan bulunmamaktadır.</p>
      ) : (
        <div className="space-y-6">
          {ilanlar.map((ilan) => (
            <div key={ilan.id} className="p-4 border rounded-md shadow-md">
              <h2 className="text-xl font-semibold">{ilan.baslik}</h2>
              <p className="text-gray-700">{ilan.aciklama}</p>

              <div className="mt-2 text-sm text-gray-600">
                <p><strong>Kadro Türü:</strong> {ilan.kadro}</p>
                <p><strong>Başlangıç:</strong> {new Date(ilan.baslangicTarihi).toLocaleDateString()}</p>
                <p><strong>Bitiş:</strong> {new Date(ilan.bitisTarihi).toLocaleDateString()}</p>
                <p><strong>Kriterler:</strong> {ilan.kriterler}</p>
                <p><strong>Durum:</strong> {ilan.durum === "ACIK" ? "Açık" : "Kapalı"}</p>
                <p><strong>Başvuru Sayısı:</strong> {ilan.basvuruSayisi}</p>
              </div>

              <div className="mt-4">
                {basvurulanIlanlar.includes(ilan.id) ? (
                  <span className="text-green-600 font-semibold">Başvuruldu ✅</span>
                ) : (
                  <Button onClick={() => handleBasvuruYap(ilan.id)}>
                    Başvur
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IlanlarPage;
