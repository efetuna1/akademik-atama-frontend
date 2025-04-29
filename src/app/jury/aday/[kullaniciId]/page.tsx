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

  const section = (
    title: string,
    arr: any[],
    renderItem: (item: any, i: number) => React.ReactNode
  ) => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {Array.isArray(arr) && arr.length > 0 ? (
        arr.map(renderItem)
      ) : (
        <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
      )}
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Aday Özgeçmişi (CV)
      </h1>

      {section("A. Makaleler", cvData.makaleler, (m: any, i: number) => (
        <div key={i} className="mb-2 text-sm text-gray-700">
          <p>
            - <strong>Yayın Adı:</strong> {m.yayinAdi}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Dergi:</strong> {m.dergiAdi}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Cilt No:</strong> {m.ciltNo ?? "—"} |{" "}
            <strong>Sayfa No:</strong> {m.sayfaNo ?? "—"}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Yıl:</strong> {m.yil} |{" "}
            <strong>İndeks Türü:</strong> {m.indeksTuru}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Puan:</strong> {m.puan ?? "—"}
          </p>
        </div>
      ))}

      {section("B. Bilimsel Toplantılar", cvData.toplantilar, (t: any, i: number) => (
        <div key={i} className="mb-2 text-sm text-gray-700">
          <p>
            - <strong>Bildirinin Adı:</strong> {t.bildiriAdi || "—"}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Konferans:</strong> {t.konferansAdi || "—"}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Etkinlik Türü:</strong> {t.etkinlikTuru}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Yer:</strong> {t.yer || "—"} |{" "}
            <strong>Tarih:</strong>{" "}
            {new Date(t.tarih).toLocaleDateString()}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Sayfa Sayısı:</strong> {t.sayfaSayisi ?? "—"} |{" "}
            <strong>Puan:</strong> {t.puan ?? "—"}
          </p>
        </div>
      ))}

      {section("C. Kitaplar", cvData.kitaplar, (k: any, i: number) => (
        <div key={i} className="mb-2 text-sm text-gray-700">
          <p>
            - <strong>Kitap Adı:</strong> {k.kitapAdi}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Yayınevi:</strong> {k.yayinevi} |{" "}
            <strong>Yayın Yeri:</strong> {k.yayinYeri ?? "—"}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Baskı Sayısı:</strong> {k.baskiSayisi} |{" "}
            <strong>Yıl:</strong> {k.yil}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Tür:</strong> {k.tur}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Puan:</strong> {k.puan ?? "—"}
          </p>
        </div>
      ))}

      {section("D. Atıflar", cvData.atiflar, (a: any, i: number) => (
        <div key={i} className="mb-2 text-sm text-gray-700">
          <p>
            - <strong>Atıf Yapan Eser:</strong> {a.atifYapanEser}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Atıf Sayısı:</strong> {a.atifSayisi}
          </p>
          <p>
            &nbsp;&nbsp;<strong>İndeks:</strong> {a.indeks}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Puan:</strong> {a.puan ?? "—"}
          </p>
        </div>
      ))}

      {section("E. Eğitim ve Öğretim Faaliyetleri", cvData.egitimOgretim, (e: any, i: number) => (
        <div key={i} className="mb-2 text-sm text-gray-700">
          <p>
            - <strong>Ders Adı:</strong> {e.dersAdi}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Program:</strong> {e.programAdi}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Ders Türü:</strong> {e.dersTuru}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Dönem:</strong> {e.dersDonemi} / {e.yil}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Puan:</strong> {e.puan ?? "—"}
          </p>
        </div>
      ))}

      {section("F. Tez Danışmanlığı", cvData.tezler, (tez: any, i: number) => (
        <div key={i} className="mb-2 text-sm text-gray-700">
          <p>
            - <strong>Öğrenci:</strong> {tez.ogrenciAdi}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Tez Adı:</strong> {tez.tezAdi}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Enstitü:</strong> {tez.enstitu ?? "—"}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Yıl:</strong> {tez.yil} | <strong>Tür:</strong> {tez.tezTuru}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Puan:</strong> {tez.puan ?? "—"}
          </p>
        </div>
      ))}

      {section("G. Patentler", cvData.patentler, (patent: any, i: number) => (
        <div key={i} className="mb-2 text-sm text-gray-700">
          <p>
            - <strong>Patent Adı:</strong> {patent.patentAdi}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Tür:</strong> {patent.patentTuru}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Yıl:</strong> {patent.yil}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Puan:</strong> {patent.puan ?? "—"}
          </p>
        </div>
      ))}

      {section("H. Araştırma Projeleri", cvData.projeler, (proje: any, i: number) => (
        <div key={i} className="mb-2 text-sm text-gray-700">
          <p>
            - <strong>Proje Adı:</strong> {proje.projeAdi}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Tür:</strong> {proje.projeTuru} | <strong>Yıl:</strong> {proje.yil}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Süre:</strong> {proje.sure} ay | <strong>Bütçe:</strong> ₺{proje.butce}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Başlangıç:</strong>{" "}
            {new Date(proje.baslamaTarihi).toLocaleDateString()} –{" "}
            <strong>Bitiş:</strong>{" "}
            {new Date(proje.bitisTarihi).toLocaleDateString()}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Puan:</strong> {proje.puan ?? "—"}
          </p>
        </div>
      ))}

      {section("I. Editörlük Faaliyetleri", cvData.editorluk, (edit: any, i: number) => (
        <div key={i} className="mb-2 text-sm text-gray-700">
          <p>
            - <strong>Dergi:</strong> {edit.dergiAdi}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Görev:</strong> {edit.editTuru} | <strong>Yıl:</strong> {edit.yil}
          </p>
          <p>
            &nbsp;&nbsp;<strong>Puan:</strong> {edit.puan ?? "—"}
          </p>
        </div>
      ))}

      {section("J. Ödüller", cvData.oduller, (odul: any, i: number) => (
        <div key={i} className="mb-1 text-sm text-gray-700">
          <p>
            - <strong>{odul.odulAdi}</strong> ({odul.odulTuru}, {odul.yil}) — Puan:{" "}
            {odul.puan ?? "—"}
          </p>
        </div>
      ))}

      {section("K. İdari/Akademik Görevler", cvData.gorevler, (g: any, i: number) => (
        <div key={i} className="mb-1 text-sm text-gray-700">
          <p>
            - <strong>{g.gorevAdi}</strong> ({g.gorevTuru})
          </p>
          <p>
            &nbsp;&nbsp;Süre: {g.sure} ay —{" "}
            {new Date(g.baslamaTarihi).toLocaleDateString()} -{" "}
            {new Date(g.bitisTarihi).toLocaleDateString()}
          </p>
          <p>
            &nbsp;&nbsp;Puan: {g.puan ?? "—"}
          </p>
        </div>
      ))}

      <div className="mt-10 text-center">
        <PDFDownloadLink
          document={<CVPdf data={cvData} />}
          fileName={`aday_cv_${kullaniciId}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <span>PDF hazırlanıyor...</span>
            ) : (
              <Button className="bg-blue-600 text-white">
                PDF Olarak İndir
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}
