import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextApiRequest) {
  /**
   * Gets all group information and returns it
   * if the user is authenticated and in the group
   */
  //   return NextResponse.json({ message: 'Hello from groups' });
  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     return NextResponse.json(
  //       { message: "Please login" },
  //       {
  //         status: 401,
  //         statusText: "Unauthorized",
  //       }
  //     );
  //   }
  //   // console.log('Session:', JSON.stringify(session, null, 2))
  //   console.log(req.query);

  // jank way to get id
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { message: "Please provide a group id" },
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  try {
    // find group with group id and user email
    const group = await prisma.group.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        users: true,
        events: true,
        admin: true,
      },
    });
    // console.log(group);

    // Fetch all users in parallel using Promise.all and map
    const promiseArray = group?.users.map(user => {
        return prisma.user.findUnique({
            where: {
                id: user.userId
            },
            });
    })
    const usersDetails = await Promise.all(promiseArray);
    group.users = usersDetails;
    return NextResponse.json(group);
  } catch (error) {
    console.error("Error fetching users in group:", error);
    throw error;
  }
}

export async function POST(req: NextApiRequest) {
  /**
   * POST a user to a group
   */

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  // read body
  const data = await req.formData();
  const adminEmail = data.get("adminEmail");
  const userEmail = data.get("userEmail");

  try {
    const group = await prisma.group.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    const admin = await prisma.user.findFirst({
      where: {
        email: adminEmail,
      },
    });
    if (admin.id == group.adminId) {
      const user = await prisma.user.findFirst({
        where: {
          email: userEmail,
        },
      });
      const groupUser = await prisma.groupUser.create({
        data: {
          userId: user.id,
          groupId: group.id,
        },
      });
      return NextResponse.json(groupUser);
    }
    return NextResponse.json(
      { message: "You are not the admin of this group" },
      {
        status: 401,
        statusText: "Unauthorized",
      }
    );
  } catch (error) {
    console.error("Error fetching users in group:", error);
    throw error;
  }
}

export async function DELETE(req: NextApiRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  try {
    await prisma.group.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting group" });
  }
}
