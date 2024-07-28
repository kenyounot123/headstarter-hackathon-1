import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: Request) {

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();


    const events = await prisma.event.findMany({
        // where: {
        //     groupId: id
        // }
    })
    return NextResponse.json({"message": "succes"})

}