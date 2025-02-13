import { PrismaClient } from "@prisma/client"; 
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Handle POST request: Add new staff
export async function POST(req: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      employeeId,
      dateOfBirth,
      gender,
      nationality,
      address,
      designation,
      languages,
      role,
      archive,
      religion,
      worknumber,
      active,
      department,
      bloodgroup,
      parentsspousename,
      identificationmark,
      salutation,
      maritalstatus,
    } = await req.json();
    // Check if the employeeId already exists in the staff profile JSON field
    const existingEmployee = await prisma.staff.findMany({
      where: {
        profile: {
          // We're going to fetch all staff records and check manually
        },
      },
    });

    // Loop through the staff records and check if the employeeId exists in the profile
    const isEmployeeIdExists = existingEmployee.some((staff) => {
      const profile = staff.profile as { employeeId: string };
      return profile.employeeId === employeeId;
    });

    if (isEmployeeIdExists) {
      return NextResponse.json(
        { error: "Employee ID already exists" },
        { status: 400 }
      );
    }
    // Dropdown data (gender and language options)
    const dropdown = {
      gender: [
        { Key: "M", Value: "Male" },
        { Key: "F", Value: "Female" },
        { Key: "O", Value: "Other" },
      ],
      language: [
        { Key: "ML", Value: "Malayalam" },
        { Key: "EN", Value: "English" },
        { Key: "HN", Value: "Hindi" },
        { Key: "TA", Value: "Tamil" },
        { Key: "TE", Value: "Telugu" },
      ],
      roles: [
        { Key: "AD", Value: "Admin" },
        { Key: "ST", Value: "Staff" },
        { Key: "HR", Value: "Hr" },
        { Key: "MN", Value: "Manager" },
      ],
      bloodgroups: [
        { Key: "A+", Value: "A Positive" },
        { Key: "A-", Value: "A Negative" },
        { Key: "B+", Value: "B Positive" },
        { Key: "B-", Value: "B Negative" },
        { Key: "AB+", Value: "AB Positive" },
        { Key: "AB-", Value: "AB Negative" },
        { Key: "O+", Value: "O Positive" },
        { Key: "O-", Value: "O Negative" },
      ],
      maritalstatuss: [
        { Key: "S", Value: "Single" },
        { Key: "M", Value: "Married" },
        { Key: "D", Value: "Divorced" },
        { Key: "W", Value: "Widowed" },
        { Key: "SP", Value: "Separated" },
      ],
      salutations: [
        { Key: "MR", Value: "Mr." },
        { Key: "MRS", Value: "Mrs." },
        { Key: "MS", Value: "Ms." },
        { Key: "DR", Value: "Dr." },
        { Key: "PROF", Value: "Prof." },
        { Key: "REV", Value: "Rev." },
        { Key: "MX", Value: "Mx." }, // Gender-neutral option
      ],
    };
    // Hash the employeeId to use as the password
    const hashedPassword = await bcrypt.hash(employeeId, 10);
    // Start a transaction to create both Staff and User records
    const [staff, user] = await prisma.$transaction([
      prisma.staff.create({
        data: {
          profile: {
            id: "some-unique-id", // Replace with a proper unique ID generator
            gmail: email,
            password: hashedPassword, // Use hashed password
            contactNumber: phone,
            firstName,
            lastName,
            employeeId,
            gender,
            archive,
            languages,
            dateOfBirth,
            maritalStatus: "Empty", // Example static data
            nationality,
            address,
            active: active ?? false,
            designation,
            religion,
            role,
            worknumber,
            department,
            bloodgroup,
            parentsspousename,
            identificationmark,
            salutation,
            maritalstatus,
          },
          dropdown,
        },
      }),
      prisma.user.create({
        data: {
          name: `${firstName} ${lastName}`, // Combine firstName and lastName
          email,
          password: hashedPassword, // Use the hashed password
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Staff and User added successfully", staff, user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding staff and user:", error);
    return NextResponse.json({ error: "Failed to add staff and user" }, { status: 500 });
  }
}

// Handle GET request: Fetch all staff
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const staff = await prisma.staff.findMany();
    return NextResponse.json({ staff }, { status: 200 });
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json({ error: "Failed to fetch staff" }, { status: 500 });
  }
}