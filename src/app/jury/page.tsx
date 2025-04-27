"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Kullanici = {
  id: number;
  ad: string;
  soyad: string;
  email: string;
};

type Ilan = {
  id: number;
  baslik: string;
};

type Basvuru = {
  id: number;
  durum: string;
  tarih: string;
  kullanici: Kullanici;
  ilan: Ilan;
};

const JuriBasvuruListesi = () => {
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBasvurular = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/juriBasvuru");
        const data = await response.json();
        setBasvurular(data);
      } catch (error) {
        console.error("Başvurular çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBasvurular();
  }, []);

  const handleIncele = (ilanId: number) => {
    router.push(`/ilandetay`);
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Jüri Başvuru Listesi</h1>

      {basvurular.length === 0 ? (
        <p>Gösterilecek başvuru yok.</p>
      ) : (
        <div className="grid gap-4">
          {basvurular.map((basvuru) => (
            <div key={basvuru.id} className="border p-4 rounded-lg shadow-md">
              <p><strong>Aday:</strong> {basvuru.kullanici.ad} {basvuru.kullanici.soyad}</p>
              <p><strong>İlan Başlığı:</strong> {basvuru.ilan.baslik}</p>
              <p><strong>Başvuru Tarihi:</strong> {new Date(basvuru.tarih).toLocaleDateString()}</p>
              <p><strong>Durum:</strong> {basvuru.durum}</p>

              <button
                onClick={() => handleIncele(basvuru.ilan.id)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                İncele
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JuriBasvuruListesi;
