// import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client/extension";

const prisma = PrismaClient();

export async function getAllEvents(req: Request) {

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();


    const events = await prisma.event.findMany({
        // where: {
        //     groupId: id
        // }
    })

}