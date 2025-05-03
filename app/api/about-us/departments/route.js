/**
 * API route for About Us Departments Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  mapDBToDepartmentsSection,
} from "@/lib/aboutUsFormData";

// GET handler to retrieve departments section data
export async function GET() {
  try {
    // Fetch from the database
    const { data, error } = await supabase
      .from("about_us")
      .select("departments_heading, departments_description, departments")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching departments section data:", error);
      return NextResponse.json(
        { error: "Failed to fetch departments section data" },
        { status: 500 }
      );
    }

    // Map to component format
    const sectionData = mapDBToDepartmentsSection(data);
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error("Error in about-us departments GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch departments section data" },
      { status: 500 }
    );
  }
}

// PUT handler to update departments section data
export async function PUT(request) {
  try {
    const sectionData = await request.json();

    // Check if record exists
    const { data: existingData, error: checkError } = await supabase
      .from("about_us")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking for existing about-us data:", checkError);
      return NextResponse.json(
        { error: "Failed to update departments section data" },
        { status: 500 }
      );
    }

    // Prepare update data
    const updateData = {
      departments_heading: sectionData.heading,
      departments_description: sectionData.description,
      departments: JSON.stringify(sectionData.departments),
    };

    let response;

    if (existingData?.id) {
      // Update existing record
      const { data: updatedData, error: updateError } = await supabase
        .from("about_us")
        .update(updateData)
        .eq("id", existingData.id)
        .select("departments_heading, departments_description, departments")
        .single();

      if (updateError) {
        console.error("Error updating departments section data:", updateError);
        return NextResponse.json(
          { error: "Failed to update departments section data" },
          { status: 500 }
        );
      }

      response = mapDBToDepartmentsSection(updatedData);
    } else {
      // If no record exists, return an error
      return NextResponse.json(
        { error: "No about_us record found to update" },
        { status: 404 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in about-us departments PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to process departments section data" },
      { status: 500 }
    );
  }
}
