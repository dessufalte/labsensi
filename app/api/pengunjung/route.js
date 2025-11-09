import { db } from "@/lib/firebase";
import { getDocs, collection} from "firebase/firestore";

export async function GET(req) {
    try {
        const snapshot = await getDocs(collection(db, "pengunjung"));
        const data = snapshot.docs.map(doc => doc.data().nama);

        return Response.json(data, { status: 200 });

    } catch (error) {
        return Response.json(error.message, { status: 500 });
    }
}