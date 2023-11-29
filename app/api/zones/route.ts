import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET() {
    const kKey = await prismadb.template.findFirst({where: {kId: 1}})
    const res = await fetch("https://api.cloudflare.com/client/v4/zones", {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + kKey?.kKey,
        },
    });
    const data = await res.json();
    console.log(data)
    try {
        const extractedData = data.result.map((item: { id: any; name: any }) => {
            return {
                id: item.id,
                name: item.name,
            };
        });
        return NextResponse.json(extractedData);
    } catch (err) {
        return NextResponse.json({result: false, reason: err});
    }
}
