'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Ilan {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    requiredDocuments: string;
    applicationConditions: string;
}

export default function AdminPanel() {
    const [ilanlar, setIlanlar] = useState<Ilan[]>([
        {
            id: 1,
            title: 'Bilimsel Araştırma Bursu',
            description: 'Bilimsel araştırma bursu başvuru ilanı.',
            startDate: '2025-04-01',
            endDate: '2025-04-30',
            requiredDocuments: 'CV, Transkript',
            applicationConditions: 'Lisans öğrencisi olmak.',
        },
        // Diğer ilanlar burada yer alabilir
    ]);

    const [newIlan, setNewIlan] = useState<Ilan>({
        id: 0,
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        requiredDocuments: '',
        applicationConditions: '',
    });

    const handleAddIlan = () => {
        if (
            newIlan.title &&
            newIlan.startDate &&
            newIlan.endDate &&
            newIlan.requiredDocuments &&
            newIlan.applicationConditions
        ) {
            const newId = ilanlar.length + 1;
            setIlanlar([...ilanlar, { ...newIlan, id: newId }]);
            setNewIlan({
                id: 0,
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                requiredDocuments: '',
                applicationConditions: '',
            });
        } else {
            alert('Lütfen tüm alanları doldurun.');
        }
    };

    const handleEditIlan = (id: number) => {
        const ilanToEdit = ilanlar.find((ilan) => ilan.id === id);
        if (ilanToEdit) {
            setNewIlan(ilanToEdit);
            setIlanlar(ilanlar.filter((ilan) => ilan.id !== id));
        }
    };

    const handleDeleteIlan = (id: number) => {
        setIlanlar(ilanlar.filter((ilan) => ilan.id !== id));
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">İlan Yönetim Paneli</h1>

            {/* İlan Ekleme Formu */}
            <div className="bg-white shadow-lg p-6 mb-8 rounded-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Yeni İlan Ekle</h2>
                <input
                    type="text"
                    placeholder="İlan Başlığı"
                    value={newIlan.title}
                    onChange={(e) => setNewIlan({ ...newIlan, title: e.target.value })}
                    className="border p-2 mb-4 rounded w-full"
                />
                <textarea
                    placeholder="İlan Açıklaması"
                    value={newIlan.description}
                    onChange={(e) => setNewIlan({ ...newIlan, description: e.target.value })}
                    className="border p-2 mb-4 rounded w-full"
                />
                <input
                    type="date"
                    value={newIlan.startDate}
                    onChange={(e) => setNewIlan({ ...newIlan, startDate: e.target.value })}
                    className="border p-2 mb-4 rounded w-full"
                />
                <input
                    type="date"
                    value={newIlan.endDate}
                    onChange={(e) => setNewIlan({ ...newIlan, endDate: e.target.value })}
                    className="border p-2 mb-4 rounded w-full"
                />
                <textarea
                    placeholder="Gerekli Belgeler"
                    value={newIlan.requiredDocuments}
                    onChange={(e) => setNewIlan({ ...newIlan, requiredDocuments: e.target.value })}
                    className="border p-2 mb-4 rounded w-full"
                />
                <textarea
                    placeholder="Başvuru Koşulları"
                    value={newIlan.applicationConditions}
                    onChange={(e) => setNewIlan({ ...newIlan, applicationConditions: e.target.value })}
                    className="border p-2 mb-4 rounded w-full"
                />
                <Button variant="default" onClick={handleAddIlan} className="w-full bg-black text-white">
                    İlan Ekle
                </Button>
            </div>

            {/* İlanları Listeleme */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">İlanlar</h2>
                {ilanlar.length === 0 ? (
                    <p className="text-gray-600">Henüz ilan eklenmemiş.</p>
                ) : (
                    <ul>
                        {ilanlar.map((ilan) => (
                            <li
                                key={ilan.id}
                                className="flex justify-between items-center p-4 bg-gray-50 mb-4 rounded-lg shadow-sm"
                            >
                                <div>
                                    <h3 className="font-semibold text-lg">{ilan.title}</h3>
                                    <p className="text-gray-600">Başlangıç Tarihi: {ilan.startDate}</p>
                                    <p className="text-gray-600">Bitiş Tarihi: {ilan.endDate}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleEditIlan(ilan.id)}
                                        className="text-blue-500"
                                    >
                                        Düzenle
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDeleteIlan(ilan.id)}
                                        className="text-red-500"
                                    >
                                        Sil
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
