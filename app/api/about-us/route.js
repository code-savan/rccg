/**
 * Main API route for About Us page data
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { defaultAboutUsData } from "@/lib/aboutUsFormData";

// GET handler to retrieve all about-us data
export async function GET() {
  try {
    // Fetch from the database
    const { data, error } = await supabase
      .from("about_us")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    // If no data is found, initialize with default data
    if (error || !data) {
      // Create a record with default data
      const { data: insertedData, error: insertError } = await supabase
        .from("about_us")
        .insert([defaultAboutUsData])
        .select()
        .single();

      if (insertError) {
        console.error("Error inserting default about-us data:", insertError);
        return NextResponse.json(
          { error: "Failed to initialize about-us data" },
          { status: 500 }
        );
      }

      return NextResponse.json(insertedData);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in about-us GET handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch about-us data" },
      { status: 500 }
    );
  }
}

// PUT handler to update all about-us data
export async function PUT(request) {
  try {
    const data = await request.json();

    // Check if record exists
    const { data: existingData, error: checkError } = await supabase
      .from("about_us")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking for existing about-us data:", checkError);
      return NextResponse.json(
        { error: "Failed to update about-us data" },
        { status: 500 }
      );
    }

    let response;

    if (existingData?.id) {
      // Update existing record
      const { data: updatedData, error: updateError } = await supabase
        .from("about_us")
        .update(data)
        .eq("id", existingData.id)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating about-us data:", updateError);
        return NextResponse.json(
          { error: "Failed to update about-us data" },
          { status: 500 }
        );
      }

      response = updatedData;
    } else {
      // Insert new record if none exists
      const { data: insertedData, error: insertError } = await supabase
        .from("about_us")
        .insert([data])
        .select()
        .single();

      if (insertError) {
        console.error("Error inserting about-us data:", insertError);
        return NextResponse.json(
          { error: "Failed to create about-us data" },
          { status: 500 }
        );
      }

      response = insertedData;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in about-us PUT handler:", error);
    return NextResponse.json(
      { error: "Failed to process about-us data" },
      { status: 500 }
    );
  }
}
