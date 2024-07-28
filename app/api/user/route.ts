import prisma from "@/lib/prisma";

export async function postUsers(req: Request) {
    const users = await prisma.user.f({
        where: {
            
        },
        include: {
            users: true
        }
    })
    console.log("✅✅✅ All users => ", users)
}
