import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { defaultServicesEventsData } from "@/lib/servicesEventsFormData";

// GET /api/services-events - Fetch all services-events data
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("services_events")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned"
      console.error("Error fetching services events data:", error);
      return NextResponse.json(
        { error: "Failed to fetch services events data" },
        { status: 500 }
      );
    }

    return NextResponse.json(data || defaultServicesEventsData);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/services-events - Update all services-events data
export async function PUT(request) {
  try {
    const body = await request.json();

    // Find the record to update
    const { data: existingData, error: fetchError } = await supabase
      .from("services_events")
      .select("id")
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 is "no rows returned"
      console.error("Error fetching existing record:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch existing record" },
        { status: 500 }
      );
    }

    let updateResult;

    if (existingData?.id) {
      // Update existing record
      updateResult = await supabase
        .from("services_events")
        .update(body)
        .eq("id", existingData.id)
        .select();
    } else {
      // Insert new record
      updateResult = await supabase
        .from("services_events")
        .insert(body)
        .select();
    }

    const { data, error } = updateResult;

    if (error) {
      console.error("Error updating services events data:", error);
      return NextResponse.json(
        { error: "Failed to update services events data" },
        { status: 500 }
      );
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
