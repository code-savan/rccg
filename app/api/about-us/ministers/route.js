/**
 * API route for About Us Ministers Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
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

    if (error) {
      console.error("Error fetching ministers section data:", error);
      return NextResponse.json(
        { error: "Failed to fetch ministers section data" },
        { status: 500 }
      );
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

    if (checkError) {
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
      // If no record exists, return an error
      return NextResponse.json(
        { error: "No about_us record found to update" },
        { status: 404 }
      );
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
