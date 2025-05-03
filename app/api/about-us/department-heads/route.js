/**
 * API route for About Us Department Heads Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  mapDBToDepartmentHeadsSection,
} from "@/lib/aboutUsFormData";

// GET handler to retrieve department heads section data
export async function GET() {
  try {
    // Fetch from the database
    const { data, error } = await supabase
      .from("about_us")
      .select(
        "department_heads_heading, department_heads_description, department_heads"
      )
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching department heads section data:", error);
      return NextResponse.json(
        { error: "Failed to fetch department heads section data" },
        { status: 500 }
      );
    }

    // Map to component format
    const sectionData = mapDBToDepartmentHeadsSection(data);
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error("Error in about-us department heads GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch department heads section data" },
      { status: 500 }
    );
  }
}

// PUT handler to update department heads section data
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
        { error: "Failed to update department heads section data" },
        { status: 500 }
      );
    }

    // Prepare update data
    const updateData = {
      department_heads_heading: sectionData.heading,
      department_heads_description: sectionData.description,
      department_heads: JSON.stringify(sectionData.departmentHeads),
    };

    let response;

    if (existingData?.id) {
      // Update existing record
      const { data: updatedData, error: updateError } = await supabase
        .from("about_us")
        .update(updateData)
        .eq("id", existingData.id)
        .select(
          "department_heads_heading, department_heads_description, department_heads"
        )
        .single();

      if (updateError) {
        console.error(
          "Error updating department heads section data:",
          updateError
        );
        return NextResponse.json(
          { error: "Failed to update department heads section data" },
          { status: 500 }
        );
      }

      response = mapDBToDepartmentHeadsSection(updatedData);
    } else {
      // If no record exists, return an error
      return NextResponse.json(
        { error: "No about_us record found to update" },
        { status: 404 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in about-us department heads PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to process department heads section data" },
      { status: 500 }
    );
  }
}
