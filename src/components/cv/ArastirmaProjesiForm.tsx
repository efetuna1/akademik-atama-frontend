// components/cv/ArastirmaProjesiForm.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface ArastirmaProjesiFormProps {
    onSave: (data: any) => void;
}

const ArastirmaProjesiForm: React.FC<ArastirmaProjesiFormProps> = ({ onSave }) => {
    const [projeAdi, setProjeAdi] = useState("");
    const [projeNumarasi, setProjeNumarasi] = useState("");
    const [kurumAdi, setKurumAdi] = useState("");
    const [yil, setYil] = useState("");
    const [secenek, setSecenek] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            projeAdi,
            projeNumarasi,
            kurumAdi,
            yil,
            secenek,
        };

        onSave(data);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">Araştırma Projesi</h2>

            <input
                type="text"
                placeholder="Projenin Adı"
                value={projeAdi}
                onChange={(e) => setProjeAdi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Proje Numarası"
                value={projeNumarasi}
                onChange={(e) => setProjeNumarasi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Projenin Yürütüldüğü Kurumun Adı"
                value={kurumAdi}
                onChange={(e) => setKurumAdi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Yılı"
                value={yil}
                onChange={(e) => setYil(e.target.value)}
                className="border p-2 rounded"
            />

            <div>
                <label htmlFor="secenek" className="block font-semibold mt-4">Kategori Seçiniz</label>
                <select
                    id="secenek"
                    value={secenek}
                    onChange={(e) => setSecenek(e.target.value)}
                    className="border p-2 rounded w-full mt-2"
                >
                    <option value="">Seçiniz</option>
                    <option value="1">AB Çerçeve Programı/NSF/ERC Bilimsel Araştırma Projesinde Koordinatör/Alt Koordinatör Olmak</option>
                    <option value="2">AB Çerçeve Programı/NSF/ERC Bilimsel Araştırma Projesinde Yürütücü Olmak</option>
                    <option value="3">AB Çerçeve Programı/NSF/ERC Bilimsel Araştırma Projesinde Araştırmacı Olmak</option>
                    <option value="4">AB Çerçeve Programı/NSF/ERC Bilimsel Araştırma Projeleri Dışındaki Uluslararası Destekli Bilimsel Araştırma Projelerinde Koordinatör/Alt Koordinatör Olmak</option>
                    <option value="5">AB Çerçeve Programı/NSF/ERC Bilimsel Araştırma Projeleri Dışındaki Uluslararası Destekli Bilimsel Araştırma Projelerinde Yürütücü Olmak</option>
                    <option value="6">AB Çerçeve Programı/NSF/ERC Bilimsel Araştırma Projeleri Dışındaki Uluslararası Destekli Bilimsel Araştırma Projelerinde Araştırmacı Olmak</option>
                    <option value="7">AB Çerçeve Programı/NSF/ERC Bilimsel Araştırma Projeleri Dışındaki Uluslararası Destekli Bilimsel Araştırma Projelerinde Danışman Olmak</option>
                    <option value="8">TÜBİTAK ARGE (ARDEB, TEYDEB) ve TÜSEB Projelerinde Yürütücü Olmak</option>
                    <option value="9">Diğer TÜBİTAK Projelerinde Yürütücü Olmak</option>
                    <option value="10">TÜBİTAK Dışındaki Diğer Kamu Kurumlarıyla Yapılan Bilimsel Araştırma Projelerinde Yürütücü Olmak</option>
                    <option value="11">Sanayi Kuruluşları ile Yapılan Ar-Ge Projelerinde Yürütücü Olmak</option>
                    <option value="12">Diğer Özel Kuruluşlar ile Yapılan Ar-Ge Projelerinde Yürütücü Olmak</option>
                    <option value="13">TÜBİTAK ARGE (ARDEB, TEYDEB) ve TÜSEB Projelerinde Araştırmacı Olmak</option>
                    <option value="14">Diğer TÜBİTAK Projelerinde Araştırmacı Olmak</option>
                    <option value="15">TÜBİTAK Dışındaki Diğer Kamu Kurumlarıyla Yapılan Bilimsel Araştırma Projelerinde Araştırmacı Olmak</option>
                    <option value="16">Sanayi Kuruluşları ile Yapılan Bilimsel Araştırma Projelerinde Araştırmacı Olmak</option>
                    <option value="17">Diğer Özel Kuruluşlar ile Yapılan Bilimsel Araştırma Projelerinde Araştırmacı Olmak</option>
                    <option value="18">TÜBİTAK ARGE (ARDEB, TEYDEB) ve TÜSEB Projelerinde Danışman Olmak</option>
                    <option value="19">Diğer TÜBİTAK Projelerinde Danışman Olmak</option>
                    <option value="20">TÜBİTAK Dışındaki Diğer Kamu Kurumlarıyla Yapılan Bilimsel Araştırma Projelerinde Danışman Olmak</option>
                    <option value="21">Sanayi Kuruluşları ile Yapılan Ar-Ge Projelerinde Danışman Olmak</option>
                    <option value="22">Diğer Özel Kuruluşlar ile Yapılan Ar-Ge Projelerinde Danışman Olmak</option>
                    <option value="23">Üniversitelerin Bilimsel Araştırma Projeleri (BAP) Koordinatörlükleri Destekli Araştırma Projelerinde Yürütücü Olmak</option>
                    <option value="24">Üniversitelerin Bilimsel Araştırma Projeleri (BAP) Koordinatörlükleri Destekli Araştırma Projelerinde Araştırmacı Olmak</option>
                    <option value="25">Üniversitelerin Bilimsel Araştırma Projeleri (BAP) Koordinatörlükleri Destekli Araştırma Projelerinde Danışman Olmak</option>
                    <option value="26">En Az Dört Aylık Yurtdışı Araştırma Çalışmasında Bulunmak</option>
                    <option value="27">En Az Dört Aylık Yurtiçi Araştırma Çalışmasında Bulunmak</option>
                    <option value="28">TÜBİTAK 2209-A, 2209-B, 2242 Projelerinde Danışman Olmak</option>
                </select>
            </div>

            <div className="mt-4 flex justify-center">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Kaydet
                </Button>
            </div>
        </form>
    );
};

export default ArastirmaProjesiForm;
