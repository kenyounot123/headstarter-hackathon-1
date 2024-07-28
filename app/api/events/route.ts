// import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client/extension";

const prisma = PrismaClient();

export async function getAllEvents() {

    // const url = new URL()

    const events = await prisma.event.findMany({
        // where: {
        //     groupId: 
        // }
    })

}