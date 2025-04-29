'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface JobPost {
  id: number;         // Prisma'da id Int
  baslik: string;     // Prisma'da baslik var, title değil
}

const AssignJury = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [selectedJobPost, setSelectedJobPost] = useState<number | null>(null);
  const [tcKimlikNo, setTcKimlikNo] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // İlanları çek
  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/ilanGetir');
        const data = await response.json();
        setJobPosts(data);
      } catch (error) {
        console.error('İlanlar alınırken hata:', error);
        setErrorMessage('İlanlar yüklenemedi.');
      }
    };

    fetchJobPosts();
  }, []);

  // Jüri atama işlemi
  const handleAssignJury = async () => {
    if (!selectedJobPost || !tcKimlikNo) {
      setErrorMessage('Lütfen ilan seçin ve TC Kimlik No girin.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/juriAta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobPostId: selectedJobPost,
          tcKimlikNo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Jüri başarıyla atandı.');
        setErrorMessage('');
        setTcKimlikNo('');
        setSelectedJobPost(null);
      } else {
        setMessage('');
        setErrorMessage(data.message || 'Bir hata oluştu.');
      }
    } catch (error) {
      console.error('Jüri atama hatası:', error);
      setMessage('');
      setErrorMessage('Sunucuya bağlanırken hata oluştu.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-2xl bg-white shadow-lg rounded-xl p-8 mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Jüri Atama</h1>

        {/* İlan listesi */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold text-gray-700">İlanlar</label>
          {jobPosts.length === 0 ? (
            <p>Hiç ilan bulunamadı.</p>
          ) : (
            <div className="space-y-2">
              {jobPosts.map((job) => (
                <Button
                  key={job.id}
                  variant={selectedJobPost === job.id ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setSelectedJobPost(job.id)}
                >
                  {job.baslik}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* TC Kimlik No alanı */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold text-gray-700">TC Kimlik No</label>
          <input
            type="text"
            maxLength={11}
            className="w-full border rounded p-2"
            value={tcKimlikNo}
            onChange={(e) => setTcKimlikNo(e.target.value)}
            placeholder="TC Kimlik No girin"
          />
        </div>

        {/* Mesajlar */}
        {message && <div className="text-green-600 mb-4">{message}</div>}
        {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

        {/* Gönder Butonu */}
        <Button
          onClick={handleAssignJury}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Jüriyi Ata
        </Button>
      </div>
    </div>
  );
};

export default AssignJury;
