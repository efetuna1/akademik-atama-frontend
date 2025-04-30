// app/juri/aday/[kullaniciId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVPdf from "@/components/pdf/CVPdf";
import { Button } from "@/components/ui/button";

export default function AdayCvIncele() {
  const { kullaniciId } = useParams();
  const [cvData, setCvData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCvData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/adaycv?kullaniciId=${kullaniciId}`);
        const data = await res.json();
        setCvData(data);
      } catch (error) {
        console.error("CV verisi alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCvData();
  }, [kullaniciId]);

  if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;
  if (!cvData) return <p className="text-center mt-10 text-red-500">Veri alınamadı.</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Aday Özgeçmişi (CV)</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">A. Makaleler</h2>
        {cvData.makaleler?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.makaleler.map((m: any, i: number) => (
            <div key={i} className="mb-2 text-sm text-gray-700">
              <p>- <strong>Yayın Adı:</strong> {m.yayinAdi}</p>
              <p>  <strong>Dergi:</strong> {m.dergiAdi}</p>
              <p>  <strong>Cilt No:</strong> {m.ciltNo ?? "—"} | <strong>Sayfa No:</strong> {m.sayfaNo ?? "—"}</p>
              <p>  <strong>Yıl:</strong> {m.yil} | <strong>İndeks Türü:</strong> {m.indeksTuru}</p>
              <p>  <strong>Puan:</strong> {m.puan ?? "—"}</p>
            </div>
          ))
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">B. Bilimsel Toplantılar</h2>
        {cvData.toplantilar?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.toplantilar.map((t: any, i: number) => (
            <div key={i} className="mb-2 text-sm text-gray-700">
              <p>- <strong>Bildirinin Adı:</strong> {t.bildiriAdi || "—"}</p>
              <p>  <strong>Konferans:</strong> {t.konferansAdi || "—"}</p>
              <p>  <strong>Etkinlik Türü:</strong> {t.etkinlikTuru}</p>
              <p>  <strong>Yer:</strong> {t.yer || "—"} | <strong>Tarih:</strong> {new Date(t.tarih).toLocaleDateString()}</p>
              <p>  <strong>Sayfa Sayısı:</strong> {t.sayfaSayisi ?? "—"} | <strong>Puan:</strong> {t.puan ?? "—"}</p>
            </div>
          ))
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">B. Kitaplar</h2>
        {cvData.kitaplar?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.kitaplar.map((k: any, i: number) => (
            <div key={i} className="mb-2 text-sm text-gray-700">
              <p>- <strong>Kitap Adı:</strong> {k.kitapAdi}</p>
              <p>  <strong>Yayınevi:</strong> {k.yayinevi} | <strong>Yayın Yeri:</strong> {k.yayinYeri ?? "—"}</p>
              <p>  <strong>Baskı Sayısı:</strong> {k.baskiSayisi} | <strong>Yıl:</strong> {k.yil}</p>
              <p>  <strong>Tür:</strong> {k.tur}</p>
              <p>  <strong>Puan:</strong> {k.puan ?? "—"}</p>
            </div>
          ))
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">C. Atıflar</h2>
        {cvData.atiflar?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.atiflar.map((a: any, i: number) => (
            <div key={i} className="mb-2 text-sm text-gray-700">
              <p>- <strong>Atıf Yapan Eser:</strong> {a.atifYapanEser}</p>
              <p>  <strong>Atıf Sayısı:</strong> {a.atifSayisi}</p>
              <p>  <strong>İndeks:</strong> {a.indeks}</p>
              <p>  <strong>Puan:</strong> {a.puan ?? "—"}</p>
            </div>
          ))
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">D. Eğitim ve Öğretim Faaliyetleri</h2>
        {cvData.egitimOgretim?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.egitimOgretim.map((e: any, i: number) => (
            <div key={i} className="mb-2 text-sm text-gray-700">
              <p>- <strong>Ders Adı:</strong> {e.dersAdi}</p>
              <p>  <strong>Program:</strong> {e.programAdi}</p>
              <p>  <strong>Ders Türü:</strong> {e.dersTuru}</p>
              <p>  <strong>Dönem:</strong> {e.dersDonemi} / {e.yil}</p>
              <p>  <strong>Puan:</strong> {e.puan ?? "—"}</p>
            </div>
          ))
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">E. Tez Danışmanlığı</h2>
        {cvData.tezler?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.tezler.map((tez: any, i: number) => (
            <div key={i} className="mb-2 text-sm text-gray-700">
              <p>- <strong>Öğrenci:</strong> {tez.ogrenciAdi}</p>
              <p>  <strong>Tez Adı:</strong> {tez.tezAdi}</p>
              <p>  <strong>Enstitü:</strong> {tez.enstitu ?? "—"}</p>
              <p>  <strong>Yıl:</strong> {tez.yil} | <strong>Tür:</strong> {tez.tezTuru}</p>
              <p>  <strong>Puan:</strong> {tez.puan ?? "—"}</p>
            </div>
          ))
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">F. Patentler</h2>
        {cvData.patentler?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.patentler.map((patent: any, i: number) => (
            <div key={i} className="mb-2 text-sm text-gray-700">
              <p>- <strong>Patent Adı:</strong> {patent.patentAdi}</p>
              <p>  <strong>Tür:</strong> {patent.patentTuru}</p>
              <p>  <strong>Yıl:</strong> {patent.yil}</p>
              <p>  <strong>Puan:</strong> {patent.puan ?? "—"}</p>
            </div>
          ))
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">G. Araştırma Projeleri</h2>
        {cvData.projeler?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.projeler.map((proje: any, i: number) => (
            <div key={i} className="mb-2 text-sm text-gray-700">
              <p>- <strong>Proje Adı:</strong> {proje.projeAdi}</p>
              <p>  <strong>Tür:</strong> {proje.projeTuru} | <strong>Yıl:</strong> {proje.yil}</p>
              <p>  <strong>Süre:</strong> {proje.sure} ay | <strong>Bütçe:</strong> ₺{proje.butce}</p>
              <p>  <strong>Başlangıç:</strong> {new Date(proje.baslamaTarihi).toLocaleDateString()} – <strong>Bitiş:</strong> {new Date(proje.bitisTarihi).toLocaleDateString()}</p>
              <p>  <strong>Puan:</strong> {proje.puan ?? "—"}</p>
            </div>
          ))
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">H. Editörlük Faaliyetleri</h2>
        {cvData.editorluk?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.editorluk.map((edit: any, i: number) => (
            <div key={i} className="mb-2 text-sm text-gray-700">
              <p>- <strong>Dergi:</strong> {edit.dergiAdi}</p>
              <p>  <strong>Görev:</strong> {edit.editTuru} | <strong>Yıl:</strong> {edit.yil}</p>
              <p>  <strong>Puan:</strong> {edit.puan ?? "—"}</p>
            </div>
          ))
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">I. Ödüller</h2>
        {cvData.oduller?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.oduller.map((odul: any, i: number) => (
            <div key={i} className="mb-1 text-sm text-gray-700">
              <p>
                - <strong>{odul.odulAdi}</strong> ({odul.odulTuru}, {odul.yil}) — Puan: {odul.puan ?? "—"}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">J. İdari/Akademik Görevler</h2>
        {cvData.gorevler?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.gorevler.map((gorev: any, i: number) => (
            <div key={i} className="mb-1 text-sm text-gray-700">
              <p>
                - <strong>{gorev.gorevAdi}</strong> ({gorev.gorevTuru})<br />
                Süre: {gorev.sure} ay — {new Date(gorev.baslamaTarihi).toLocaleDateString()} - {new Date(gorev.bitisTarihi).toLocaleDateString()}<br />
                Puan: {gorev.puan ?? "—"}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">K. Güzel Sanatlar Faaliyetleri</h2>
        {cvData.sanatFaaliyetleri?.length === 0 ? (
          <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
        ) : (
          cvData.sanatFaaliyetleri.map((faaliyet: any, i: number) => (
            <div key={i} className="mb-1 text-sm text-gray-700">
              <p>
                - <strong>{faaliyet.faaliyetAdi}</strong> ({faaliyet.faaliyetTuru}, {faaliyet.yil}) — Puan: {faaliyet.puan ?? "—"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Diğer bölümler de benzer şekilde: Toplantılar, Kitaplar vs. */}

      < div className="mt-10 text-center" >
        <PDFDownloadLink
          document={<CVPdf data={cvData} />}
          fileName={`aday_cv_${kullaniciId}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <span>PDF hazırlanıyor...</span>
            ) : (
              <Button className="bg-blue-600 text-white">PDF Olarak İndir</Button>
            )
          }
        </PDFDownloadLink>
      </div >
    </div >
  );
}
