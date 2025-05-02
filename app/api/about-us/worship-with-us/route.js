/**
 * API route for About Us Worship With Us Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  defaultAboutUsData,
  mapDBToWorshipWithUsSection,
} from "@/lib/aboutUsFormData";

// GET handler to retrieve worship with us section data
export async function GET() {
  try {
    // Fetch from the database
    const { data, error } = await supabase
      .from("about_us")
      .select(
        "worship_with_us_heading, worship_with_us_description, worship_with_us_schedule, worship_with_us_location, worship_with_us_image"
      )
      .order("id", { ascending: true })
      .limit(1)
      .single();

    // If no data is found, initialize with default data
    if (error || !data) {
      // Return default data if record doesn't exist yet
      const defaultSectionData =
        mapDBToWorshipWithUsSection(defaultAboutUsData);
      return NextResponse.json(defaultSectionData);
    }

    // Map to component format
    const sectionData = mapDBToWorshipWithUsSection(data);
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error("Error in about-us worship-with-us GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch worship with us section data" },
      { status: 500 }
    );
  }
}

// PUT handler to update worship with us section data
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
        { error: "Failed to update worship with us section data" },
        { status: 500 }
      );
    }

    // Prepare update data
    const updateData = {
      worship_with_us_heading: sectionData.heading,
      worship_with_us_description: sectionData.description,
      worship_with_us_schedule: JSON.stringify(sectionData.schedule),
      worship_with_us_location: sectionData.location,
      worship_with_us_image: sectionData.image,
    };

    let response;

    if (existingData?.id) {
      // Update existing record
      const { data: updatedData, error: updateError } = await supabase
        .from("about_us")
        .update(updateData)
        .eq("id", existingData.id)
        .select(
          "worship_with_us_heading, worship_with_us_description, worship_with_us_schedule, worship_with_us_location, worship_with_us_image"
        )
        .single();

      if (updateError) {
        console.error(
          "Error updating worship with us section data:",
          updateError
        );
        return NextResponse.json(
          { error: "Failed to update worship with us section data" },
          { status: 500 }
        );
      }

      response = mapDBToWorshipWithUsSection(updatedData);
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
          "worship_with_us_heading, worship_with_us_description, worship_with_us_schedule, worship_with_us_location, worship_with_us_image"
        )
        .single();

      if (insertError) {
        console.error(
          "Error inserting worship with us section data:",
          insertError
        );
        return NextResponse.json(
          { error: "Failed to create worship with us section data" },
          { status: 500 }
        );
      }

      response = mapDBToWorshipWithUsSection(insertedData);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in about-us worship with us PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to process worship with us section data" },
      { status: 500 }
    );
  }
}
