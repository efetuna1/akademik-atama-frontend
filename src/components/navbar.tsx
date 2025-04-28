"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedRole = localStorage.getItem("Role");
        setRole(storedRole);
    }, []);

    const handleLogout = () => {
        // Çıkış işlemi
        localStorage.removeItem("Role");
        router.push("/login");  // Çıkış yaptıktan sonra login sayfasına yönlendir
    };

    if (pathname !== "/" && pathname !== "/IlanlarPage") {
        return null;
    }

    type LinkItem = {
        href: string;
        label: string;
        onClick?: () => void; // Optional onClick property
    };

    const commonLinks: LinkItem[] = [
        { href: "/", label: "Ana Sayfa" },
        { href: "/IlanlarPage", label: "İlanlar" },
    ];

    if (!role) {
        commonLinks.push({ href: "/login", label: "Giriş Yap" });
    } else {
        // Eğer kullanıcı giriş yaptıysa, çıkış yap butonunu ekle
        commonLinks.push({ href: "#", label: "Çıkış Yap", onClick: handleLogout });
    }

    return (
        <nav className="bg-black p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="font-bold text-2xl">Akademik Başvuru Sistemi</div>
                <div className="flex space-x-7">
                    {commonLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={link.onClick} // Çıkış yap butonunun çalışmasını sağlar
                            className="hover:underline cursor-pointer"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
