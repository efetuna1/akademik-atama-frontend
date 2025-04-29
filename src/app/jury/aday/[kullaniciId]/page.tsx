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
                {cvData.makaleler?.map((m: any, i: number) => (
                    <p key={i} className="text-gray-700 text-sm">
                        - {m.yayinAdi} ({m.indeksTuru}, {m.puan} puan)
                    </p>
                ))}
            </div>

            {/* Diğer bölümler de benzer şekilde: Toplantılar, Kitaplar vs. */}

            <div className="mt-10 text-center">
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
            </div>
        </div>
    );
}
