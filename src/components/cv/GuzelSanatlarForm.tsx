import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface GuzelSanatlarData {
    faaliyetAdi: string;
    yil: string;
    secenek: string;
}

interface GuzelSanatlarFormProps {
    onSave: (data: GuzelSanatlarData) => void;
}
const handleGuzelSanatlarSave = async (data: GuzelSanatlarData) => {
    try {
        const response = await fetch("http://localhost:3001/api/guzelsanatEkle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Bir hata oluştu");
        }

        const result = await response.json();
        console.log("Veri başarıyla kaydedildi:", result);
        // İsteğe bağlı: bildirim göster, formu sıfırla vs.

    } catch (error) {
        console.error("Hata:", error);
        alert("Veri kaydedilemedi.");
    }
};

const GuzelSanatlarForm: React.FC<GuzelSanatlarFormProps> = ({ onSave }) => {
    const [faaliyetAdi, setFaaliyetAdi] = useState("");
    const [yil, setYil] = useState("");
    const [secenek, setSecenek] = useState("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!faaliyetAdi || !yil || !secenek) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        const data = {
            faaliyetAdi,
            yil,
            secenek,
        };


    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
            <GuzelSanatlarForm onSave={handleGuzelSanatlarSave} />
            <h2 className="text-2xl font-semibold text-center">Eğitim Öğretim Faaliyeti</h2>
            <input
                type="text"
                placeholder="Faaliyet Adı"
                value={faaliyetAdi}
                onChange={(e) => setFaaliyetAdi(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="number"
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
                    <option value="1">Özgün sanat eserlerinin, tasarım veya yorum çalışmalarının yurt dışında sanat, eğitim ve kültür kurumlarınca satın alınması veya bu eser(ler) için telif ödenmesi (Kurumlar bazında puanlama yapılır)</option>
                    <option value="2">Özgün sanat eserlerinin, tasarım veya yorum çalışmalarının yurt içinde sanat, eğitim ve kültür kurumlarınca satın alınması veya bu eser(ler) için telif ödenmesi (Kurumlar bazında puanlama yapılır)</option>
                    <option value="3">Yerel Yönetimler veya Özel Kuruluşların desteklediği kamusal alanda kalıcı olarak gerçekleştirilen sanat projeleri (Heykel, Duvar Resmi / Graffiti, Enstalasyon vb.) (Kurumlar bazında puanlama yapılır)</option>
                    <option value="4">Galerilerde, müzelerde, sanat ve kültür merkezlerinde gerçekleştirilen Küratörlük etkinlikleri (En fazla iki kez puanlanır) (Yabancı dilde)</option>
                    <option value="5">Özgün sanat eserleri, tasarımlar ya da yorum/icra çalışmalarıyla yurtdışında uluslararası jürili kişisel etkinlikte bizzat katılım</option>
                    <option value="6">Özgün sanat eserleri, tasarımlar ya da yorum/icra çalışmalarıyla yurtiçinde jürili kişisel etkinlikte bizzat katılım</option>
                    <option value="7">Yurtdışında uluslararası jürili karma/ortak etkinlikte bizzat katılım</option>
                    <option value="8">Yurtiçinde ulusal jürili karma/ortak etkinlikte bizzat katılım</option>
                    <option value="9">Uluslararası çalıştay/workshop/sempozyum/yarışma/festival/şenlikte yöneticilik/yürütücülük</option>
                    <option value="10">Ulusal çalıştay/workshop/sempozyum/yarışma/festival/şenlikte yöneticilik/yürütücülük</option>
                    <option value="11">Uluslararası çalıştay/workshop/sempozyum/yarışma/festival/şenlikte araştırmacılık/kurul üyeliği</option>
                    <option value="12">Ulusal çalıştay/workshop/sempozyum/yarışma/festival/şenlikte araştırmacılık/kurul üyeliği</option>
                    <option value="13">Uluslararası yarışmalarda/festivallerde/şenliklerde jüri üyeliği</option>
                    <option value="14">Ulusal yarışmalarda/festivallerde/şenliklerde jüri üyeliği</option>
                    <option value="15">Üretilen eserlerin uluslararası haber/yayın organlarında yer alması veya gösterime/dinletime girmesi</option>
                    <option value="16">Üretilen eserlerin ulusal haber/yayın organlarında yer alması veya gösterime/dinletime girmesi</option>
                    <option value="17">Uluslararası resital icra etmek</option>
                    <option value="18">Uluslararası konserlerde solist icracı olarak yer almak</option>
                    <option value="19">Uluslararası konserlerde karma icracı olarak yer almak</option>
                    <option value="20">Uluslararası konserlerde orkestra/müzik/koro şefliği</option>
                    <option value="21">Uluslararası oda müziği konserinde icracı olarak yer almak</option>
                    <option value="22">Uluslararası konserlerde grup şefi olarak yer almak</option>
                    <option value="23">Uluslararası konserlerde grup üyesi olarak yer almak</option>
                    <option value="24">Uluslararası resital/koro konserinde eşlikçi olarak yer almak</option>
                    <option value="25">Uluslararası konserlerde konser yönetmenliği/dinleti koordinatörlüğü</option>
                    <option value="26">Ulusal resital icra etmek</option>
                    <option value="27">Ulusal bireysel dinletide yer almak</option>
                    <option value="28">Ulusal karma dinletide yer almak</option>
                    <option value="29">Ulusal orkestra/müzik/koro şefliği</option>
                    <option value="30">Ulusal oda müziği konserinde icracı olmak</option>
                    <option value="31">Ulusal konserlerde grup şefi olarak yer almak</option>
                    <option value="32">Ulusal konserlerde grup üyesi olarak yer almak</option>
                    <option value="33">Ulusal resital/koro konserinde eşlikçi olarak yer almak</option>
                    <option value="34">Ulusal konserlerde konser yönetmenliği/dinleti koordinatörlüğü</option>
                    <option value="35">Uluslararası sesli/görsel yayınlarda bireysel ses yayını</option>
                    <option value="36">Uluslararası sesli/görsel yayınlarda karma ses yayını</option>
                    <option value="37">Uluslararası sesli/görsel yayınlarda sanat yönetmeni/müzik yönetmeni olarak hazırlama</option>
                    <option value="38">Uluslararası radyo/TV etkinliği - Program hazırlamak</option>
                    <option value="39">Uluslararası radyo/TV etkinliği - Bireysel katılım</option>
                    <option value="40">Uluslararası radyo/TV etkinliği - Karma katılım</option>
                    <option value="41">Ulusal sesli/görsel yayınlarda bireysel ses yayını</option>
                    <option value="42">Ulusal sesli/görsel yayınlarda karma ses yayını</option>
                    <option value="43">Ulusal sesli/görsel yayınlarda sanat yönetmeni/müzik yönetmeni olarak hazırlama</option>
                    <option value="44">Ulusal radyo/TV etkinliği - Program hazırlamak</option>
                    <option value="45">Ulusal radyo/TV etkinliği - Bireysel katılım</option>
                    <option value="46">Ulusal radyo/TV etkinliği - Karma katılım</option>
                    <option value="47">0–5 dk. Ulusal orkestra için eser sahibi olmak</option>
                    <option value="48">5–10 dk. Ulusal orkestra için eser sahibi olmak</option>
                    <option value="49">10–15 dk. Ulusal orkestra için eser sahibi olmak</option>
                    <option value="50">15+ dk. Ulusal orkestra için eser sahibi olmak</option>
                    <option value="51">0–5 dk. Ulusal oda müziği eseri sahibi olmak</option>
                    <option value="52">5–10 dk. Ulusal oda müziği eseri sahibi olmak</option>
                    <option value="53">10–15 dk. Ulusal oda müziği eseri sahibi olmak</option>
                    <option value="54">15+ dk. Ulusal oda müziği eseri sahibi olmak</option>
                    <option value="55">0–5 dk. Ulusal elektronik/elektro-akustik müzik eseri</option>
                    <option value="56">5–10 dk. Ulusal elektronik/elektro-akustik müzik eseri</option>
                    <option value="57">10–15 dk. Ulusal elektronik/elektro-akustik müzik eseri</option>
                    <option value="58">15+ dk. Ulusal elektronik/elektro-akustik müzik eseri</option>
                    <option value="59">0–5 dk. Uluslararası orkestra için eser sahibi olmak</option>
                    <option value="60">5–10 dk. Uluslararası orkestra için eser sahibi olmak</option>
                    <option value="61">10–15 dk. Uluslararası orkestra için eser sahibi olmak</option>
                    <option value="62">15+ dk. Uluslararası orkestra için eser sahibi olmak</option>
                    <option value="63">0–5 dk. Uluslararası oda müziği eseri sahibi olmak</option>
                    <option value="64">5–10 dk. Uluslararası oda müziği eseri sahibi olmak</option>
                    <option value="65">10–15 dk. Uluslararası oda müziği eseri sahibi olmak</option>
                    <option value="66">15+ dk. Uluslararası oda müziği eseri sahibi olmak</option>
                    <option value="67">0–5 dk. Uluslararası elektronik/elektro-akustik müzik eseri</option>
                    <option value="68">5–10 dk. Uluslararası elektronik/elektro-akustik müzik eseri</option>
                    <option value="69">10–15 dk. Uluslararası elektronik/elektro-akustik müzik eseri</option>
                    <option value="70">15+ dk. Uluslararası elektronik/elektro-akustik müzik eseri</option>
                    <option value="71">Türk müziği makamlarıyla bestelenmiş geleneksel formlarda eser sahibi olmak (Nota ile)</option>
                    <option value="72">Türk müziği eserini bestelemek ve ulusal seslendirme</option>
                    <option value="73">Türk müziği eserini bestelemek ve uluslararası seslendirme</option>
                    <option value="74">THM derlemesi (TRT onaylı)</option>
                    <option value="75">THM derlemesi (Nota ile)</option>
                    <option value="76">THM derlemesi notaya alınmış (TRT onaylı)</option>
                    <option value="77">Büyük oyun/film yönetmenliği</option>
                    <option value="78">Kısa oyun/film yönetmenliği</option>
                    <option value="79">Uzun sahne oyunu/senaryo/dizi yazarlığı</option>
                    <option value="80">Kısa sahne oyunu/senaryo yazarlığı</option>
                    <option value="81">Uzun uyarlama oyun/senaryo yazarlığı veya metin düzenleme</option>
                    <option value="82">Kısa uyarlama oyun/senaryo yazarlığı veya metin düzenleme</option>
                    <option value="83">Dramaturgluk, oyunculuk, tasarım vb. alanlarda çalışmak (detaylı bilgi gerekli)</option>
                    <option value="84"> Kısa oyun/senaryo dramaturjisi yapmak</option>
                    <option value="85"> Uzun oyun/senaryo/dizi drama metni çevirmek</option>
                    <option value="86"> Kısa oyun/senaryo metni çevirmek</option>
                    <option value="87"> Uzun oyunda/sinema filminde/dizi dramada başrol</option>
                    <option value="88"> Uzun oyunda/sinema filminde/dizi dramada diğer roller</option>
                    <option value="89"> Kısa oyun/filmde başrol</option>
                    <option value="90"> Kısa oyun/filmde diğer roller</option>
                    <option value="91"> Sahne oyunu/film (uzun) ve dizi drama dekor/kostüm/ışık/ses/efekt tasarımı</option>
                    <option value="92"> Sahne oyunu/film (uzun) ve dizi drama dekor/kostüm/ışık/ses/efekt tasarımı ekibinde görev almak</option>
                    <option value="93"> Sahne oyunu/film (kısa) dekor/kostüm/ışık/ses/efekt tasarımı</option>
                    <option value="94"> Sahne oyunu/film (kısa) dekor/kostüm/ışık/ses/efekt tasarımı ekibinde görev almak</option>
                    <option value="95"> Sahne oyunu/film (uzun) ve dizi dramada makyaj, mask, kukla, butafor vb. tasarımı</option>
                    <option value="96"> Sahne oyunu/film (uzun) ve dizi dramada makyaj, mask, kukla, butafor vb. tasarımı ekibinde görev almak</option>
                    <option value="97"> Sahne oyunu/film (kısa) makyaj, mask, kukla, butafor vb. tasarımı</option>
                    <option value="98"> Sahne oyunu/film (kısa) makyaj, mask, kukla, butafor vb. tasarımı ekibinde görev almak</option>
                    <option value="99"> Sanat yönetmenliği (uzun prodüksiyonlar)</option>
                    <option value="100"> Sanat yönetmenliği (kısa prodüksiyonlar)</option>
                    <option value="101"> Koreografi, dramatizasyon, dinleti, performans, happening veya workshop (atölye) düzenleme/yönetme</option>
                    <option value="102"> Kongre, sempozyum, festival etkinliklerinde atölye çalışması düzenlemek</option>
                    <option value="103"> Yapıtın festival, şenlik vb. etkinliklere katılımı</option>
                    <option value="104"> Oyunun/senaryonun/filmin/sergilenmiş oyunun video kaydının vb. kamu/özel TV’ler, dijital platformlar, kurumsal kimlikli internet siteleri vb. tarafından satın alınması/gösterilmesi; Devlet Tiyatroları, Şehir Tiyatroları vb. tiyatroların repertuvarlarına girmesi</option>
                    <option value="105"> En az 10 kere gerçekleştirilmiş olan sanatsal bir yarışma/ödül organizasyonu tarafından yapıtın/sanatçının ödüllendirilmesi</option>

                </select>
            </div>

            <div className="mt-4 flex justify-center">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Kaydet
                </Button>
            </div>
        </form>
    );
}
export default GuzelSanatlarForm;