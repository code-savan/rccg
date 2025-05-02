/**
 * API route for About Us Departments Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  defaultAboutUsData,
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

    // If no data is found, initialize with default data
    if (error || !data) {
      // Return default data if record doesn't exist yet
      const defaultSectionData = mapDBToDepartmentsSection(defaultAboutUsData);
      return NextResponse.json(defaultSectionData);
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

    if (checkError && checkError.code !== "PGRST116") {
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
      // Insert new record with default values for other fields
      const insertData = {
        ...defaultAboutUsData,
        ...updateData,
      };

      const { data: insertedData, error: insertError } = await supabase
        .from("about_us")
        .insert([insertData])
        .select("departments_heading, departments_description, departments")
        .single();

      if (insertError) {
        console.error("Error inserting departments section data:", insertError);
        return NextResponse.json(
          { error: "Failed to create departments section data" },
          { status: 500 }
        );
      }

      response = mapDBToDepartmentsSection(insertedData);
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
