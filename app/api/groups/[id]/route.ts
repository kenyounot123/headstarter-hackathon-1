// import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
    const promiseArray = group?.users.map((user: any) => {
      return prisma.user.findUnique({
        where: {
          id: user.userId,
        },
      });
    });
    const usersDetails = await Promise.all(promiseArray as Array<Promise<any>>);

    if (!group) {
      return NextResponse.json(
        { message: "Group not found" },
        {
          status: 404,
          statusText: "Not Found",
        }
      );
    }

    group.users = usersDetails;
    return NextResponse.json(group);
  } catch (error) {
    console.error("Error fetching users in group:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
export async function POST(req: NextRequest) {
  /**
   * POST a user to a group
   */

  const url = new URL(req.url as string);
  const url = new URL(req.url as string);
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

  // read body
  const data = await req.formData();
  const adminEmail = data.get("adminEmail") as string;
  const userEmail = data.get("userEmail") as string;
  const adminEmail = data.get("adminEmail") as string;
  const userEmail = data.get("userEmail") as string;

  try {
    const group = await prisma.group.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!group) {
      return NextResponse.json(
        { message: "Group not found" },
        {
          status: 404,
          statusText: "Not Found",
        }
      );
    }

    const admin = await prisma.user.findFirst({
      where: {
        email: adminEmail,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        {
          status: 404,
          statusText: "Not Found",
        }
      );
    }

    if (admin.id == group.adminId) {
      const user = await prisma.user.findFirst({
        where: {
          email: userEmail,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          {
            status: 404,
            statusText: "Not Found",
          }
        );
      }

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

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url as string);
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
