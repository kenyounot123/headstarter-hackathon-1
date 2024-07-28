import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";


export async function GET(req: Request) {

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();


    const events = await prisma.event.findMany({
        // where: {
        //     groupId: id
        // }
    })

}