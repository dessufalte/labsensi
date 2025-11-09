"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  // State untuk mengontrol visibilitas menu di mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Daftar menu
  const menuList = [
    { name: "Absensi", path: "/" },

  ];

  const pathname = usePathname();

  // Menutup menu mobile setiap kali path berubah
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);


  // --- Kelas untuk styling tombol ---
  // Tombol saat aktif (path cocok)
  const buttonClicked = "bg-slate-200 text-slate-900 font-bold";
  // Tombol saat tidak aktif
  const buttonUnClicked = "text-slate-300 hover:bg-slate-700 hover:text-white";

  return (
    <nav className="flex flex-row top-0 z-50 w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Bagian Logo */}
          <div className="flex items-center space-x-2">
            <Image src="/lkj.png" alt="Logo LKJ" width={30} height={30} />
            <Image src="/webkomjar-ico.svg" alt="Logo Webkomjar" width={150} height={40} />
          </div>

          {/* Menu untuk Desktop (tersembunyi di mobile) */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-1 bg-slate-800/50 border border-slate-700 rounded-full px-2 py-1">
              {menuList.map((item) => (
                <Link key={item.path} href={item.path}>
                  <li
                    className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
                      pathname === item.path ? buttonClicked : buttonUnClicked
                    }`}
                  >
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Tombol Hamburger (hanya tampil di mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Buka menu utama"
            >
              {/* Ikon Hamburger atau X, tergantung state */}
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu dropdown untuk Mobile */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800 border-t border-slate-700">
          {menuList.map((item) => (
            <Link key={item.path} href={item.path}>
              <li
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  pathname === item.path ? buttonClicked : buttonUnClicked
                }`}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
}
