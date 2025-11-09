import { db } from "@/lib/firebase";
import {
  query,
  collection,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const limitParam = parseInt(url.searchParams.get("limit") || "10"); // default ambil 10 terakhir

    const q = query(
      collection(db, "absen"),
      orderBy("timestamp", "desc"),
      limit(limitParam)
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching absensi:", error);
    return Response.json({ message: "Gagal mengambil data absensi." }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json();
    const { nama, nomor_kursi } = body;

    if (!nama || !nomor_kursi) {
      return Response.json(
        { message: "Nama dan nomor kursi harus diisi." },
        { status: 400 }
      );
    }

    if (nomor_kursi < 1 || nomor_kursi > 30) {
      return Response.json(
        { message: "Nomor kursi harus antara 1 hingga 30" },
        { status: 400 }
      );
    }

    const absen = {
      nama: nama.trim(),
      nomor_kursi: Number(nomor_kursi),
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "absen"), absen);

    const q = query(collection(db, "pengunjung"), where("nama", "==", nama));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      await addDoc(collection(db, "pengunjung"), { nama });
    }

    return Response.json(
      { message: `${nama} dengan nomor kursi ${nomor_kursi} berhasil absen.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving absensi:", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
