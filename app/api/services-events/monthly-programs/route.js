import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import {
  mapMonthlyProgramsSectionToDB,
  mapDBToMonthlyProgramsSection,
  defaultServicesEventsData,
} from "@/lib/servicesEventsFormData";

// GET /api/services-events/monthly-programs - Fetch monthly programs section data
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("services_events")
      .select("monthly_programs_heading, monthly_programs")
      .single();

    if (error) {
      console.error("Error fetching monthly programs section data:", error);

      // If no data found, return default values
      if (error.code === "PGRST116") {
        const defaultData = {
          monthly_programs_heading:
            defaultServicesEventsData.monthly_programs_heading,
          monthly_programs: defaultServicesEventsData.monthly_programs,
        };
        return NextResponse.json(mapDBToMonthlyProgramsSection(defaultData));
      }

      return NextResponse.json(
        { error: "Failed to fetch monthly programs section data" },
        { status: 500 }
      );
    }

    // Ensure data is properly formatted
    const sanitizedData = {
      monthly_programs_heading:
        data?.monthly_programs_heading ||
        defaultServicesEventsData.monthly_programs_heading,
      monthly_programs:
        data?.monthly_programs || defaultServicesEventsData.monthly_programs,
    };

    // Map database fields to component state
    const mappedData = mapDBToMonthlyProgramsSection(sanitizedData);
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error(
      "Server error fetching monthly programs section data:",
      error
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/services-events/monthly-programs - Update monthly programs section data
export async function PUT(request) {
  try {
    const body = await request.json();

    // Map component state to database fields
    const dbData = mapMonthlyProgramsSectionToDB(body);

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
        .update(dbData)
        .eq("id", existingData.id)
        .select("monthly_programs_heading, monthly_programs");
    } else {
      // Insert new record with default values for other sections
      updateResult = await supabase
        .from("services_events")
        .insert({
          ...dbData,
          // Add default values for other sections
          welcome_heading: defaultServicesEventsData.welcome_heading,
          welcome_subheading: defaultServicesEventsData.welcome_subheading,
          welcome_background_image:
            defaultServicesEventsData.welcome_background_image,
          church_info_heading: defaultServicesEventsData.church_info_heading,
          church_info_date: defaultServicesEventsData.church_info_date,
          church_info_bible_verse:
            defaultServicesEventsData.church_info_bible_verse,
          church_info_bible_reference:
            defaultServicesEventsData.church_info_bible_reference,
          church_info_contacts: defaultServicesEventsData.church_info_contacts,
          church_info_background_image:
            defaultServicesEventsData.church_info_background_image,
          weekly_programs_heading:
            defaultServicesEventsData.weekly_programs_heading,
          weekly_programs_description:
            defaultServicesEventsData.weekly_programs_description,
          weekly_programs: defaultServicesEventsData.weekly_programs,
          upcoming_events_heading:
            defaultServicesEventsData.upcoming_events_heading,
          upcoming_events: defaultServicesEventsData.upcoming_events,
        })
        .select("monthly_programs_heading, monthly_programs");
    }

    const { data, error } = updateResult;

    if (error) {
      console.error("Error updating monthly programs section data:", error);
      return NextResponse.json(
        { error: "Failed to update monthly programs section data" },
        { status: 500 }
      );
    }

    // Map database fields back to component state
    const mappedData = mapDBToMonthlyProgramsSection(data[0]);
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error(
      "Server error updating monthly programs section data:",
      error
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
