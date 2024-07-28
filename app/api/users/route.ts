import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    /**
     * Gets all information about user
     */
    // const data = await req.formData()
    
    const url = new URL(req.url);
    const queryParams = url.searchParams;

    // Example: Get the value of the "email" query parameter
    const email = queryParams.get("email");

    if (!email) {
        return NextResponse.json(
            { message: "Please provide an email" },
            {
                status: 400,
                statusText: "Bad Request",
            }
        );
    }
  
    try {
      // find group with group id and user email
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
            groups: {
                select: {
                    id: true,
                    adminId: true,
                    secretCode: true,
                    createdAt: true,
                }
            },
            events: {
                select: {
                    id: true,
                    jobId: true,
                    adminId: true,
                    groupId: true,
                    createdAt: true,
                }
            }
        }
        });

      return NextResponse.json(user);
    } catch (error) {
      console.error("Error fetching users in group:", error);
      throw error;
    }
  }