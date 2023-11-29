import fs from "fs";
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import prismadb from "@/lib/prismadb";

const prisma = new PrismaClient();


export async function GET(
    request: Request,
    {params}: { params: { api: string } },
) {
    try {
        const result = await prismadb.template.findFirst({})
        if (result === null) {
            await prisma.template.create({
                data: {kKey: params.api}
            })
        } else {
            await prisma.template.update({
                where: {kId: 1},
                data: {kKey: params.api}
            })
        }
        return NextResponse.json({success: true});
    } catch (error) {
        return NextResponse.json({success: false});
    }
}
