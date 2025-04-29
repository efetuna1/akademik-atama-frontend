'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function JuriBasvurular() {
  const [juriData, setJuriData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // UserId'yi localStorage'dan alıyoruz

    if (!userId) {
      setError('Kullanıcı ID bulunamadı');
      setLoading(false);
      return;
    }

    const fetchJuriData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/juriBasvuru?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Başvurular alınırken bir hata oluştu');
        }

        const data = await response.json();
        setJuriData(data.ilanlar); // Backend'den gelen ilan verisini alıyoruz
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJuriData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Jüri Başvuruları</h2>
      {juriData?.length === 0 ? (
        <p className="text-center text-gray-600">Başvuru bulunmamaktadır.</p>
      ) : (
        <div className="space-y-6">
          {juriData?.map((ilan: any) => (
            <div key={ilan.id} className="border p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">{ilan.baslik}</h3>
              <p className="text-gray-700">{ilan.aciklama}</p>
              <div className="mt-4">
                <h4 className="font-medium">Başvurular:</h4>
                <ul className="list-disc ml-5">
                  {ilan.basvurular.map((basvuru: any) => (
                    <li key={basvuru.id} className="text-gray-600">
                      <p><strong>{basvuru.kullanici.ad} {basvuru.kullanici.soyad}</strong></p>
                      <p>TC Kimlik No: {basvuru.kullanici.tcKimlikNo}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 text-center">
        <Button
          onClick={() => router.push('/dashboard')}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200 cursor-pointer"
        >
          Geri Dön
        </Button>
      </div>
    </div>
  );
}
