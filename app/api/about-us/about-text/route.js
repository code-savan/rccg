/**
 * API route for About Us About Text Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  defaultAboutUsData,
  mapDBToAboutTextSection,
} from "@/lib/aboutUsFormData";

// GET handler to retrieve about text section data
export async function GET() {
  try {
    // Fetch from the database
    const { data, error } = await supabase
      .from("about_us")
      .select("about_text_heading, about_text_content")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    // If no data is found, initialize with default data
    if (error || !data) {
      // Return default data if record doesn't exist yet
      const defaultSectionData = mapDBToAboutTextSection(defaultAboutUsData);
      return NextResponse.json(defaultSectionData);
    }

    // Map to component format
    const sectionData = mapDBToAboutTextSection(data);
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error("Error in about-us about-text GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch about text section data" },
      { status: 500 }
    );
  }
}

// PUT handler to update about text section data
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
        { error: "Failed to update about text section data" },
        { status: 500 }
      );
    }

    // Prepare update data
    const updateData = {
      about_text_heading: sectionData.heading,
      about_text_content: sectionData.content,
    };

    let response;

    if (existingData?.id) {
      // Update existing record
      const { data: updatedData, error: updateError } = await supabase
        .from("about_us")
        .update(updateData)
        .eq("id", existingData.id)
        .select("about_text_heading, about_text_content")
        .single();

      if (updateError) {
        console.error("Error updating about text section data:", updateError);
        return NextResponse.json(
          { error: "Failed to update about text section data" },
          { status: 500 }
        );
      }

      response = mapDBToAboutTextSection(updatedData);
    } else {
      // Insert new record with default values for other fields
      const insertData = {
        ...defaultAboutUsData,
        ...updateData,
      };

      const { data: insertedData, error: insertError } = await supabase
        .from("about_us")
        .insert([insertData])
        .select("about_text_heading, about_text_content")
        .single();

      if (insertError) {
        console.error("Error inserting about text section data:", insertError);
        return NextResponse.json(
          { error: "Failed to create about text section data" },
          { status: 500 }
        );
      }

      response = mapDBToAboutTextSection(insertedData);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in about-us about-text PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to process about text section data" },
      { status: 500 }
    );
  }
}
