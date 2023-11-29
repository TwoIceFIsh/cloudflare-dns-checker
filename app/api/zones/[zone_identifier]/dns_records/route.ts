import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
    request: Request,
    {params}: { params: { zone_identifier: string } },
) {
    try {
        const key = await prismadb.template.findFirst({where: {kId: 1}})
        if (key != null) {
            const res = await fetch(
                `https://api.cloudflare.com/client/v4/zones/${params.zone_identifier}/dns_records`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + key.kKey,
                    },
                },
            );
            const data = await res.json();
            console.log(data)
            const filteredData = data.result.filter(
                (item: { type: string }) =>
                    item.type === "CNAME" || item.type === "A" || item.type === "AAAA",
            );
            //name type content
            const extractedData = filteredData.map(
                (item: { name: any; type: any; content: any }) => {
                    if (item.content.toString().includes("cfargotunnel.com"))
                        item.content = "cfargotunnel.com";

                    return {
                        name: item.name,
                        type: item.type,
                        content: item.content,
                    };
                },
            );

            return NextResponse.json(extractedData);
        }
    } catch (err) {
        return NextResponse.json({result: false});
    }
}
