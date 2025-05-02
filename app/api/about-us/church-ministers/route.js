/**
 * API route for About Us Church Ministers Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  defaultAboutUsData,
  mapDBToChurchMinistersSection,
} from "@/lib/aboutUsFormData";

// GET handler to retrieve church ministers section data
export async function GET() {
  try {
    // Fetch from the database
    const { data, error } = await supabase
      .from("about_us")
      .select(
        "church_ministers_heading, church_ministers_description, church_ministers"
      )
      .order("id", { ascending: true })
      .limit(1)
      .single();

    // If no data is found, initialize with default data
    if (error || !data) {
      // Return default data if record doesn't exist yet
      const defaultSectionData =
        mapDBToChurchMinistersSection(defaultAboutUsData);
      return NextResponse.json(defaultSectionData);
    }

    // Map to component format
    const sectionData = mapDBToChurchMinistersSection(data);
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error("Error in about-us church ministers GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch church ministers section data" },
      { status: 500 }
    );
  }
}

// PUT handler to update church ministers section data
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
        { error: "Failed to update church ministers section data" },
        { status: 500 }
      );
    }

    // Prepare update data
    const updateData = {
      church_ministers_heading: sectionData.heading,
      church_ministers_description: sectionData.description,
      church_ministers: JSON.stringify(sectionData.churchMinisters),
    };

    let response;

    if (existingData?.id) {
      // Update existing record
      const { data: updatedData, error: updateError } = await supabase
        .from("about_us")
        .update(updateData)
        .eq("id", existingData.id)
        .select(
          "church_ministers_heading, church_ministers_description, church_ministers"
        )
        .single();

      if (updateError) {
        console.error(
          "Error updating church ministers section data:",
          updateError
        );
        return NextResponse.json(
          { error: "Failed to update church ministers section data" },
          { status: 500 }
        );
      }

      response = mapDBToChurchMinistersSection(updatedData);
    } else {
      // Insert new record with default values for other fields
      const insertData = {
        ...defaultAboutUsData,
        ...updateData,
      };

      const { data: insertedData, error: insertError } = await supabase
        .from("about_us")
        .insert([insertData])
        .select(
          "church_ministers_heading, church_ministers_description, church_ministers"
        )
        .single();

      if (insertError) {
        console.error(
          "Error inserting church ministers section data:",
          insertError
        );
        return NextResponse.json(
          { error: "Failed to create church ministers section data" },
          { status: 500 }
        );
      }

      response = mapDBToChurchMinistersSection(insertedData);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in about-us church ministers PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to process church ministers section data" },
      { status: 500 }
    );
  }
}
