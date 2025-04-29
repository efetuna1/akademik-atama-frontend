"use client";

import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
        fontFamily: "Helvetica",
    },
    section: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 6,
        textDecoration: "underline",
    },
    item: {
        marginBottom: 4,
    },
});

interface CVPdfProps {
    data: any;
}

const CVPdf = ({ data }: CVPdfProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 10 }}>
                Aday Özgeçmişi (Tablo 5 Formatında)
            </Text>

            {/* A. Makaleler */}
            <View style={styles.section}>
                <Text style={styles.heading}>A. Makaleler</Text>
                {data.makaleler?.map((m: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {m.yayinAdi} ({m.indeksTuru}) - {m.puan} puan
                    </Text>
                ))}
            </View>

            {/* B. Bilimsel Toplantılar */}
            <View style={styles.section}>
                <Text style={styles.heading}>B. Bilimsel Toplantılar</Text>
                {data.toplantilar?.map((t: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {t.bildiriAdi || t.konferansAdi} ({t.etkinlikTuru}) - {t.puan} puan
                    </Text>
                ))}
            </View>

            {/* C. Kitaplar */}
            <View style={styles.section}>
                <Text style={styles.heading}>C. Kitaplar</Text>
                {data.kitaplar?.map((k: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {k.ad} ({k.kategori}) - {k.puan} puan
                    </Text>
                ))}
            </View>

            {/* Toplam Puan */}
            <View style={styles.section}>
                <Text style={styles.heading}>Toplam Puan</Text>
                <Text>
                    {
                        (data.makaleler?.reduce((sum: number, m: any) => sum + (m.puan || 0), 0) || 0) +
                        (data.toplantilar?.reduce((sum: number, t: any) => sum + (t.puan || 0), 0) || 0) +
                        (data.kitaplar?.reduce((sum: number, k: any) => sum + (k.puan || 0), 0) || 0)
                    } puan
                </Text>
            </View>
        </Page>
    </Document>
);

export default CVPdf;
