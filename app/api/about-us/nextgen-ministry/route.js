/**
 * API route for About Us NextGen Ministry Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  mapDBToNextGenMinistrySection,
} from "@/lib/aboutUsFormData";

// GET handler to retrieve nextgen ministry section data
export async function GET() {
  try {
    // Fetch from the database
    const { data, error } = await supabase
      .from("about_us")
      .select(
        "nextgen_ministry_title, nextgen_ministry_description, nextgen_ministry_image"
      )
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching nextgen ministry section data:", error);
      return NextResponse.json(
        { error: "Failed to fetch nextgen ministry section data" },
        { status: 500 }
      );
    }

    // Map to component format
    const sectionData = mapDBToNextGenMinistrySection(data);
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error("Error in about-us nextgen ministry GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch nextgen ministry section data" },
      { status: 500 }
    );
  }
}

// PUT handler to update nextgen ministry section data
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
        { error: "Failed to update nextgen ministry section data" },
        { status: 500 }
      );
    }

    // Prepare update data
    const updateData = {
      nextgen_ministry_title: sectionData.title,
      nextgen_ministry_description: sectionData.description,
      nextgen_ministry_image: sectionData.image,
    };

    let response;

    if (existingData?.id) {
      // Update existing record
      const { data: updatedData, error: updateError } = await supabase
        .from("about_us")
        .update(updateData)
        .eq("id", existingData.id)
        .select(
          "nextgen_ministry_title, nextgen_ministry_description, nextgen_ministry_image"
        )
        .single();

      if (updateError) {
        console.error(
          "Error updating nextgen ministry section data:",
          updateError
        );
        return NextResponse.json(
          { error: "Failed to update nextgen ministry section data" },
          { status: 500 }
        );
      }

      response = mapDBToNextGenMinistrySection(updatedData);
    } else {
      // If no record exists, return an error
      return NextResponse.json(
        { error: "No about_us record found to update" },
        { status: 404 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in about-us nextgen ministry PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to process nextgen ministry section data" },
      { status: 500 }
    );
  }
}
