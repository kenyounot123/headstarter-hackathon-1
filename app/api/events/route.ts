// import prisma from "@/lib/prisma";
import { NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client/extension";

const prisma = PrismaClient();

// export async function () {

//     const events = await prisma.event.create({

//     })


export async function POST(req: NextRequest) {
    /**
     * Create a new group
     */
    // 
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //     return NextResponse.json(
    //       { message: 'Please login' },
    //       {
    //         status: 401,
    //         statusText: 'Unauthorized',
    //       }
    //     );
    //   }

    // console.log('Session:', JSON.stringify(session, null, 2))
    const data = await req.formData()

    try {
        const admin = await prisma.user.findUnique({
            where: {
                email: data.get('email') as string
            }
        })
        if (!admin) {
            return NextResponse.json(
                { message: 'Admin not found' },
                {
                  status: 404,
                  statusText: 'Not Found',
                }
              );
        }

        const group = await prisma.group.create({
            data: {
                admin: {
                    connect: {
                        id: admin.id
                    }
                },
                secretCode: secretCode,
            }
        })
        await prisma.groupUser.create({
            data: {
                user: {
                    connect: {
                        id: admin.id
                    }
                },
                group: {
                    connect: {
                        id: group.id
                    }
                }
            }
        })
    
        return NextResponse.json(group);
      } catch (error) {
        console.error('Error fetching users in group:', error);
      }
}

// }