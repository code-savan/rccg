/**
 * API route for About Us Hero Section
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { defaultAboutUsData, mapDBToHeroSection } from "@/lib/aboutUsFormData";

// GET handler to retrieve hero section data
export async function GET() {
  try {
    // Fetch from the database
    const { data, error } = await supabase
      .from("about_us")
      .select("hero_heading, hero_subheading, hero_background_image")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    // If no data is found, initialize with default data
    if (error || !data) {
      // Return default data if record doesn't exist yet
      const defaultSectionData = mapDBToHeroSection(defaultAboutUsData);
      return NextResponse.json(defaultSectionData);
    }

    // Map to component format
    const sectionData = mapDBToHeroSection(data);
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error("Error in about-us hero GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero section data" },
      { status: 500 }
    );
  }
}

// PUT handler to update hero section data
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
        { error: "Failed to update hero section data" },
        { status: 500 }
      );
    }

    // Prepare update data
    const updateData = {
      hero_heading: sectionData.heading,
      hero_subheading: sectionData.subheading,
      hero_background_image: sectionData.backgroundImage,
    };

    let response;

    if (existingData?.id) {
      // Update existing record
      const { data: updatedData, error: updateError } = await supabase
        .from("about_us")
        .update(updateData)
        .eq("id", existingData.id)
        .select("hero_heading, hero_subheading, hero_background_image")
        .single();

      if (updateError) {
        console.error("Error updating hero section data:", updateError);
        return NextResponse.json(
          { error: "Failed to update hero section data" },
          { status: 500 }
        );
      }

      response = mapDBToHeroSection(updatedData);
    } else {
      // Insert new record with default values for other fields
      const insertData = {
        ...defaultAboutUsData,
        ...updateData,
      };

      const { data: insertedData, error: insertError } = await supabase
        .from("about_us")
        .insert([insertData])
        .select("hero_heading, hero_subheading, hero_background_image")
        .single();

      if (insertError) {
        console.error("Error inserting hero section data:", insertError);
        return NextResponse.json(
          { error: "Failed to create hero section data" },
          { status: 500 }
        );
      }

      response = mapDBToHeroSection(insertedData);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in about-us hero PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to process hero section data" },
      { status: 500 }
    );
  }
}
