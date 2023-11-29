import fs from "fs";
import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";


export async function GET(
    request: Request,
    {params}: { params: { api: string } },
) {
    try {
        const result = await prismadb.template.findFirst({})
        if (result === null) {
            await prismadb.template.create({
                data: {kKey: params.api}
            })
        } else {
            await prismadb.template.update({
                where: {kId: 1},
                data: {kKey: params.api}
            })
        }
        return NextResponse.json({success: true});
    } catch (error) {
        return NextResponse.json({success: false});
    }
}
