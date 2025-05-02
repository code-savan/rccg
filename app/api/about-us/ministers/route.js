/**
 * API route for About Us Ministers Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  defaultAboutUsData,
  mapDBToMinistersSection,
} from "@/lib/aboutUsFormData";

// GET handler to retrieve ministers section data
export async function GET() {
  try {
    // Fetch from the database
    const { data, error } = await supabase
      .from("about_us")
      .select("ministers_heading, ministers_description, ministers")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    // If no data is found, initialize with default data
    if (error || !data) {
      // Return default data if record doesn't exist yet
      const defaultSectionData = mapDBToMinistersSection(defaultAboutUsData);
      return NextResponse.json(defaultSectionData);
    }

    // Map to component format
    const sectionData = mapDBToMinistersSection(data);
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error("Error in about-us ministers GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch ministers section data" },
      { status: 500 }
    );
  }
}

// PUT handler to update ministers section data
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
        { error: "Failed to update ministers section data" },
        { status: 500 }
      );
    }

    // Prepare update data
    const updateData = {
      ministers_heading: sectionData.heading,
      ministers_description: sectionData.description,
      ministers: JSON.stringify(sectionData.ministers),
    };

    let response;

    if (existingData?.id) {
      // Update existing record
      const { data: updatedData, error: updateError } = await supabase
        .from("about_us")
        .update(updateData)
        .eq("id", existingData.id)
        .select("ministers_heading, ministers_description, ministers")
        .single();

      if (updateError) {
        console.error("Error updating ministers section data:", updateError);
        return NextResponse.json(
          { error: "Failed to update ministers section data" },
          { status: 500 }
        );
      }

      response = mapDBToMinistersSection(updatedData);
    } else {
      // Insert new record with default values for other fields
      const insertData = {
        ...defaultAboutUsData,
        ...updateData,
      };

      const { data: insertedData, error: insertError } = await supabase
        .from("about_us")
        .insert([insertData])
        .select("ministers_heading, ministers_description, ministers")
        .single();

      if (insertError) {
        console.error("Error inserting ministers section data:", insertError);
        return NextResponse.json(
          { error: "Failed to create ministers section data" },
          { status: 500 }
        );
      }

      response = mapDBToMinistersSection(insertedData);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in about-us ministers PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to process ministers section data" },
      { status: 500 }
    );
  }
}
