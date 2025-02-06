import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Initialize Prisma Client
const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    // Fetch staff data with dropdown field
    const staff = await prisma.staff.findMany({
      select: {
        dropdown: true, // Select the dropdown field
      },
    });

    // Extract unique languages and gender and role values
    const languages: string[] = [];
    const gender: string[] = [];
    const role : string[] = [];
    staff.forEach((staffMember) => {
      const dropdown = staffMember.dropdown as { language: string[]; gender: string[]; role: string[] };
      languages.push(...dropdown.language);
      gender.push(...dropdown.gender);
      role.push(...dropdown.role);
    });

    // Remove duplicates
    const uniqueLanguages = [...new Set(languages)];
    const uniqueGender = [...new Set(gender)];
    const uniqueRole = [...new Set(role)];


    return NextResponse.json({ languages: uniqueLanguages, gender: uniqueGender , role: uniqueRole });
  } catch (error) {
    console.error("Error fetching dropdown data:", error);
    return NextResponse.json(
      { message: "Failed to fetch dropdown data" },
      { status: 500 }
    );
  }
}
