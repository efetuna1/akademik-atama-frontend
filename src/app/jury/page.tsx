"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

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

  const handleGoHome = () => {
    router.push("/"); // Ana sayfaya yönlendirme
  };


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

  if (loading) return <div className="text-center text-lg mt-10">Yükleniyor...</div>;
  <Navbar />
  return (

    <main className="flex flex-col items-center justify-center min-h-screen bg-stone-200 p-6"
      style={{
        backgroundImage: "url('/banner2.png')",
        backgroundSize: "cover", // resmi tam kapla
        backgroundRepeat: "no-repeat", // tekrar etmesin
        backgroundPosition: "center", // ortala
      }}
    >
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        <Button
          onClick={handleGoHome}
          className="text-blue-600 hover:bg-blue-200 rounded "
        >
          Ana Sayfaya Geri Dön
        </Button>
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Jüri Başvuru Listesi
        </h1>

        {basvurular.length === 0 ? (
          <p className="text-center text-gray-600">Gösterilecek başvuru yok.</p>
        ) : (
          <div className="grid gap-6">
            {basvurular.map((basvuru) => (
              <div key={basvuru.id} className="p-6 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-lg">
                  <strong>Aday:</strong> {basvuru.kullanici.ad} {basvuru.kullanici.soyad}
                </p>
                <p className="text-lg">
                  <strong>İlan Başlığı:</strong> {basvuru.ilan.baslik}
                </p>
                <p className="text-gray-600">
                  <strong>Başvuru Tarihi:</strong> {new Date(basvuru.tarih).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>Durum:</strong> {basvuru.durum}
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleIncele(basvuru.ilan.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                  >
                    İncele
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/">
            <span className="text-blue-500 hover:underline">Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default JuriBasvuruListesi;
