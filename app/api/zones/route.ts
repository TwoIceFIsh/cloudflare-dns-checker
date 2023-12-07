import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export const dynamic = 'force-dynamic'
export async function GET() {
    const kKey = await prismadb.template.findFirst({where: {kId: 1}})
    if (kKey === null) return NextResponse.json({result: false, reason: 'no key'});
    const res = await fetch("https://api.cloudflare.com/client/v4/zones", {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + kKey.kKey,
        },cache:"no-store"
    });
    const data = await res.json();
    try {
        const extractedData = data.result.map((item: { id: any; name: any }) => {
            return {
                id: item.id,
                name: item.name,
            };
        });
        return NextResponse.json(extractedData);
    } catch (err) {
        return NextResponse.json([]);
    }
}
