import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  type data = { email: string };

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const json = await req.json();
  const email = json.email as string;

  const contentType = req.headers.get("Content-Type");

  if (typeof email !== "string" || !isValidEmail(email)) {
    return new Response("Invalid email address", { status: 400 });
  }
  try {
    if (contentType !== "application/json") {
      return new Response(JSON.stringify({ error: "Unsupported Media Type" }), {
        status: 415,
        headers: { "Content-Type": "application/json" },
      });
    }

    const waitlistUser = await prisma.waitlist.create({
      data: {
        email: email,
      },
    });
    console.log(waitlistUser)
    return new Response(JSON.stringify(waitlistUser), { status: 201 });
  } catch (error) {
    console.error("Error creating waitlist user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
