import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { validateGetInvolvedData } from "@/lib/getInvolvedSchema";

// GET /api/get-involved - Fetch get-involved data
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("get_involved")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching get-involved data:", error);
      return NextResponse.json(
        { error: "Failed to fetch get-involved data" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Server error fetching get-involved data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/get-involved - Update get-involved data
export async function PUT(request) {
  try {
    const body = await request.json();

    // Validate the data
    const { valid, errors } = validateGetInvolvedData(body);
    if (!valid) {
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    // Find the record to update
    const { data: existingData, error: fetchError } = await supabase
      .from("get_involved")
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
        .from("get_involved")
        .update(body)
        .eq("id", existingData.id)
        .select();
    } else {
      // Insert new record
      updateResult = await supabase.from("get_involved").insert(body).select();
    }

    const { data, error } = updateResult;

    if (error) {
      console.error("Error updating get-involved data:", error);
      return NextResponse.json(
        { error: "Failed to update get-involved data" },
        { status: 500 }
      );
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Server error updating get-involved data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
