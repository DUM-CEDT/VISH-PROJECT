import { authOptions } from "@/app/libs/authOptions";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const handler = NextAuth(authOptions);

export async function GET(req: NextRequest) {
  return handler(req, undefined);
}

export async function POST(req: NextRequest) {
  return handler(req, undefined);
}