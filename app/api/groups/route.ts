import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next"
import { NextResponse } from 'next/server';
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req: Request) {
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

    function random32bit() {
        let u = new Uint32Array(1);
        crypto.getRandomValues(u);
        let str = u[0].toString(16).toUpperCase();
        return '00000000'.slice(str.length) + str;
    }
    const secretCode = random32bit()

    try {
        const admin = await prisma.user.findUnique({
            where: {
                email: data.get('email')
            }
        })
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