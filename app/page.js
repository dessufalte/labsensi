"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [nama, setNama] = useState("");
  const [selectedMeja, setSelectedMeja] = useState(null);
  const [allNames, setAllNames] = useState([]);

  async function fetchNames() {
    try {
      const response = await fetch("/api/pengunjung");
      const data = await response.json();
      setAllNames(data);
    } catch (error) {
      console.error("Error fetching names:", error);
    }
  }

  useEffect(() => {
    fetchNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama || !selectedMeja) {
      alert("Mohon isi nama dan pilih nomor meja!");
      return;
    }

    try {
      const res = await fetch("/api/absen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, nomor_kursi: selectedMeja }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      alert(result.message);
      setNama("");
      setSelectedMeja(null);

      await fetchNames();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const mejaList = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* 🌐 NAVBAR */}
      <nav className="flex flex-row top-0 z-50 w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image src="/lkj.png" alt="Logo LKJ" width={30} height={30} />
              <Image
                src="/webkomjar-ico.svg"
                alt="Logo Webkomjar"
                width={150}
                height={40}
              />
            </div>
            <ul className="flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-full px-3 py-1">
              <li className="bg-slate-200 text-slate-900 font-bold px-4 py-1 rounded-full text-sm">
                Absensi
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="relative flex flex-col items-center justify-start flex-grow z-10 w-full px-10 pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute inset-0 backdrop-blur-md bg-white/5"></div>

        <div className="relative z-10 w-full max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-10"
          >
            <div className="flex w-full max-w-2xl mx-auto relative items-center">
              <input
                list="namaList"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white placeholder-zinc-400 shadow-inner focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm transition-all duration-200 appearance-none"
                autoComplete="off"
              />

              <datalist id="namaList">
                {allNames.map((n, index) => (
                  <option key={index} value={n} />
                ))}
              </datalist>

              <button
                type="submit"
                className="ml-3 px-6 py-3 rounded-xl bg-blue-600/80 hover:bg-blue-500/90 backdrop-blur-md text-white text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 whitespace-nowrap"
              >
                Simpan
              </button>
            </div>

            <div className="w-full mt-6">
              <div className="grid grid-cols-5 gap-x-14 gap-y-10 justify-items-center">
                {mejaList.map((no) => (
                  <button
                    key={no}
                    type="button"
                    onClick={() => setSelectedMeja(no)}
                    className={`w-28 h-24 rounded-2xl text-2xl font-semibold shadow-md transition-all duration-300 backdrop-blur-sm ${
                      selectedMeja === no
                        ? "bg-blue-500/70 text-white scale-105 border border-blue-300 shadow-blue-500/30"
                        : "bg-white/10 hover:bg-white/20 text-zinc-200 border border-white/10"
                    }`}
                  >
                    {no}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
