"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, []);

    const commonLinks = [
        { href: "/", label: "Ana Sayfa" },
    ];

    let roleBasedLinks = [];

    if (!role) {
        roleBasedLinks.push({ href: "/login", label: "Giriş Yap" });
    } else if (role === "ADAY") {
        roleBasedLinks.push({ href: "/adaycv", label: "Profilim" });
    } else if (role === "JURI_UYESI") {
        roleBasedLinks.push({ href: "/jury", label: "Jüri Başvurular" });
    } else if (role === "ADMIN") {
        roleBasedLinks.push({ href: "/admin", label: "Yönetici Paneli" });
    } else if (role === "YONETICI") {
        roleBasedLinks.push({ href: "/IlanYonetimi", label: "İlan Yönetimi" });
    }

    return (
        <nav className="bg-black p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="font-bold text-2xl">Akademik Başvuru Sistemi</div>
                <div className="flex space-x-7">
                    {commonLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:underline cursor-pointer ">
                            {link.label}
                        </Link>
                    ))}
                    {roleBasedLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:underline">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
