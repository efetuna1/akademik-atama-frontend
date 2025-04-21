'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Candidate {
    id: string;
    name: string;
    cv: string;
    score: number;
    categories: string[];
}

const JuryPage = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [report, setReport] = useState('');
    const [evaluation, setEvaluation] = useState<'positive' | 'negative' | null>(null);

    const router = useRouter();

    useEffect(() => {
        // Burada backend'den jüriye sunulacak aday bilgilerini alacağız.
        // Örnek bir veri simülasyonu:
        setCandidates([
            {
                id: '1',
                name: 'Ahmet Yılmaz',
                cv: 'https://linktothecv.com/ahmet',
                score: 85,
                categories: ['Bilimsel Araştırma', 'Öğretim Üyesi'],
            },
            {
                id: '2',
                name: 'Mehmet Çelik',
                cv: 'https://linktothecv.com/mehmet',
                score: 92,
                categories: ['Akademik Kongre', 'Öğretim Üyesi'],
            },
        ]);
    }, []);

    const handleCandidateSelect = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
        setReport(''); // Seçilen adaya ait önceki rapor sıfırlanır
        setEvaluation(null); // Seçilen adaya ait değerlendirme sıfırlanır
    };

    const handleSaveReport = () => {
        if (selectedCandidate && report && evaluation) {
            const data = {
                candidateId: selectedCandidate.id,
                report,
                evaluation,
            };

            // Backend'e raporu ve değerlendirmeyi gönder
            console.log('Report submitted: ', data);
            // Router kullanarak başka sayfaya yönlendirme yapabilirsiniz.
            router.push('/jury-results');
        } else {
            alert('Lütfen raporu ve değerlendirmeyi girin.');
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-stone-200 p-6 ">
            <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 text-center w-2/3">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">Jüri Değerlendirme Sayfası</h1>

                {/* Aday Seçimi */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-blue-600">Adaylar</h2>
                    <div className="flex flex-col gap-4 mt-4">
                        {candidates.map((candidate) => (
                            <div key={candidate.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <h3 className="font-semibold text-lg">{candidate.name}</h3>
                                <p className="text-gray-600">Puan: {candidate.score}</p>
                                <p className="text-gray-600">Başvurulan Kategoriler: {candidate.categories.join(', ')}</p>
                                <Button

                                    variant="default"
                                    className="mt-2 w-full bg-black text-white hover:bg-gray-500 hover:cursor-pointer"
                                    onClick={() => handleCandidateSelect(candidate)}
                                >
                                    Seç
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seçilen Adayın Bilgileri */}
                {selectedCandidate && (
                    <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Aday: {selectedCandidate.name}</h2>
                        <p><strong>CV Linki: </strong><a href={selectedCandidate.cv} target="_blank" className="text-blue-500">{selectedCandidate.cv}</a></p>
                        <p><strong>Puan: </strong>{selectedCandidate.score}</p>
                        <p><strong>Başvurulan Kategoriler: </strong>{selectedCandidate.categories.join(', ')}</p>

                        {/* Jüri Raporu ve Değerlendirme */}
                        <div className="mt-6">
                            <h3
                                className="font-semibold">Değerlendirme Raporu</h3>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Aday hakkında rapor yazın..."
                                value={report}
                                onChange={(e) => setReport(e.target.value)}
                                rows={6}
                            />
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold ">Değerlendirme</h3>
                            <hr></hr>
                            <br></br>
                            <div className="flex gap-4">
                                <Button

                                    variant={evaluation === 'positive' ? 'default' : 'outline'}
                                    onClick={() => setEvaluation('positive')}
                                    className="mt-2 w-1/2 bg-gray-800 text-white hover:bg-green-600 hover:cursor-pointer"
                                >
                                    Olumlu
                                </Button>
                                <Button
                                    variant={evaluation === 'negative' ? 'default' : 'outline'}
                                    onClick={() => setEvaluation('negative')}
                                    className="mt-2 w-1/2 bg-gray-800 text-white hover:bg-red-600 hover:text-black hover:cursor-pointer"
                                >
                                    Olumsuz
                                </Button>
                            </div>
                            <br></br>
                            {evaluation && (
                                <p className="mt-2 text-black bg-gray-200 p-2 rounded">
                                    Sonuç: {evaluation === 'positive' ? 'Olumlu' : 'Olumsuz'}
                                </p>
                            )}
                        </div>

                        {/* Kaydet Butonu */}
                        <div className="mt-6 flex justify-center">
                            <Button
                                variant="default"
                                className="w-full p-2 border border-gray-400 rounded hover:bg-gray-500 hover:text-white hover:cursor-pointer"
                                onClick={handleSaveReport}
                            >
                                Değerlendirmeyi Kaydet
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default JuryPage;
