/**
 * API route for About Us History Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  defaultAboutUsData,
  mapDBToHistorySection,
} from "@/lib/aboutUsFormData";

// GET handler to retrieve history section data
export async function GET() {
  try {
    // Fetch from the database
    const { data, error } = await supabase
      .from("about_us")
      .select("history_heading, history_content, history_image")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    // If no data is found, initialize with default data
    if (error || !data) {
      // Return default data if record doesn't exist yet
      const defaultSectionData = mapDBToHistorySection(defaultAboutUsData);
      return NextResponse.json(defaultSectionData);
    }

    // Map to component format
    const sectionData = mapDBToHistorySection(data);
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error("Error in about-us history GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch history section data" },
      { status: 500 }
    );
  }
}

// PUT handler to update history section data
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
        { error: "Failed to update history section data" },
        { status: 500 }
      );
    }

    // Prepare update data
    const updateData = {
      history_heading: sectionData.heading,
      history_content: sectionData.content,
      history_image: sectionData.image,
    };

    let response;

    if (existingData?.id) {
      // Update existing record
      const { data: updatedData, error: updateError } = await supabase
        .from("about_us")
        .update(updateData)
        .eq("id", existingData.id)
        .select("history_heading, history_content, history_image")
        .single();

      if (updateError) {
        console.error("Error updating history section data:", updateError);
        return NextResponse.json(
          { error: "Failed to update history section data" },
          { status: 500 }
        );
      }

      response = mapDBToHistorySection(updatedData);
    } else {
      // Insert new record with default values for other fields
      const insertData = {
        ...defaultAboutUsData,
        ...updateData,
      };

      const { data: insertedData, error: insertError } = await supabase
        .from("about_us")
        .insert([insertData])
        .select("history_heading, history_content, history_image")
        .single();

      if (insertError) {
        console.error("Error inserting history section data:", insertError);
        return NextResponse.json(
          { error: "Failed to create history section data" },
          { status: 500 }
        );
      }

      response = mapDBToHistorySection(insertedData);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in about-us history PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to process history section data" },
      { status: 500 }
    );
  }
}
