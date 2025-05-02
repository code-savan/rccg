/**
 * API route for About Us NextGen Ministers Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  defaultAboutUsData,
  mapDBToNextGenMinistersSection,
} from "@/lib/aboutUsFormData";

// GET handler to retrieve nextgen ministers section data
export async function GET() {
  try {
    // Fetch from the database
    const { data, error } = await supabase
      .from("about_us")
      .select(
        "nextgen_ministers_heading, nextgen_ministers_description, nextgen_ministers"
      )
      .order("id", { ascending: true })
      .limit(1)
      .single();

    // If no data is found, initialize with default data
    if (error || !data) {
      // Return default data if record doesn't exist yet
      const defaultSectionData =
        mapDBToNextGenMinistersSection(defaultAboutUsData);
      return NextResponse.json(defaultSectionData);
    }

    // Map to component format
    const sectionData = mapDBToNextGenMinistersSection(data);
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error("Error in about-us nextgen ministers GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch nextgen ministers section data" },
      { status: 500 }
    );
  }
}

// PUT handler to update nextgen ministers section data
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
        { error: "Failed to update nextgen ministers section data" },
        { status: 500 }
      );
    }

    // Prepare update data
    const updateData = {
      nextgen_ministers_heading: sectionData.heading,
      nextgen_ministers_description: sectionData.description,
      nextgen_ministers: JSON.stringify(sectionData.nextGenMinisters),
    };

    let response;

    if (existingData?.id) {
      // Update existing record
      const { data: updatedData, error: updateError } = await supabase
        .from("about_us")
        .update(updateData)
        .eq("id", existingData.id)
        .select(
          "nextgen_ministers_heading, nextgen_ministers_description, nextgen_ministers"
        )
        .single();

      if (updateError) {
        console.error(
          "Error updating nextgen ministers section data:",
          updateError
        );
        return NextResponse.json(
          { error: "Failed to update nextgen ministers section data" },
          { status: 500 }
        );
      }

      response = mapDBToNextGenMinistersSection(updatedData);
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
          "nextgen_ministers_heading, nextgen_ministers_description, nextgen_ministers"
        )
        .single();

      if (insertError) {
        console.error(
          "Error inserting nextgen ministers section data:",
          insertError
        );
        return NextResponse.json(
          { error: "Failed to create nextgen ministers section data" },
          { status: 500 }
        );
      }

      response = mapDBToNextGenMinistersSection(insertedData);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in about-us nextgen ministers PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to process nextgen ministers section data" },
      { status: 500 }
    );
  }
}
