import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import {
  mapChurchInfoSectionToDB,
  mapDBToChurchInfoSection,
  defaultServicesEventsData,
} from "@/lib/servicesEventsFormData";

// GET /api/services-events/church-info - Fetch church info section data
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("services_events")
      .select(
        "church_info_heading, church_info_date, church_info_bible_verse, church_info_bible_reference, church_info_contacts, church_info_background_image"
      )
      .single();

    if (error) {
      console.error("Error fetching church info section data:", error);

      // If no data found, return default values
      if (error.code === "PGRST116") {
        const defaultData = {
          church_info_heading: defaultServicesEventsData.church_info_heading,
          church_info_date: defaultServicesEventsData.church_info_date,
          church_info_bible_verse:
            defaultServicesEventsData.church_info_bible_verse,
          church_info_bible_reference:
            defaultServicesEventsData.church_info_bible_reference,
          church_info_contacts: defaultServicesEventsData.church_info_contacts,
          church_info_background_image:
            defaultServicesEventsData.church_info_background_image,
        };

        // Wrap in try-catch to handle any parsing errors
        try {
          return NextResponse.json(mapDBToChurchInfoSection(defaultData));
        } catch (parseError) {
          console.error("Error parsing default church info data:", parseError);
          // Return a basic response that won't cause client-side errors
          return NextResponse.json({
            heading: defaultServicesEventsData.church_info_heading,
            date: defaultServicesEventsData.church_info_date,
            bibleVerse: defaultServicesEventsData.church_info_bible_verse,
            bibleReference:
              defaultServicesEventsData.church_info_bible_reference,
            contacts: [],
            backgroundImage:
              defaultServicesEventsData.church_info_background_image,
          });
        }
      }

      return NextResponse.json(
        { error: "Failed to fetch church info section data" },
        { status: 500 }
      );
    }

    // Ensure data is properly formatted with fallbacks
    const sanitizedData = {
      church_info_heading:
        data?.church_info_heading ||
        defaultServicesEventsData.church_info_heading,
      church_info_date:
        data?.church_info_date || defaultServicesEventsData.church_info_date,
      church_info_bible_verse:
        data?.church_info_bible_verse ||
        defaultServicesEventsData.church_info_bible_verse,
      church_info_bible_reference:
        data?.church_info_bible_reference ||
        defaultServicesEventsData.church_info_bible_reference,
      church_info_contacts:
        data?.church_info_contacts ||
        defaultServicesEventsData.church_info_contacts,
      church_info_background_image:
        data?.church_info_background_image ||
        defaultServicesEventsData.church_info_background_image,
    };

    // Safely map the data and catch any potential errors
    try {
      const mappedData = mapDBToChurchInfoSection(sanitizedData);
      return NextResponse.json(mappedData);
    } catch (parseError) {
      console.error("Error parsing church info data:", parseError);
      // Return a basic response that won't cause client-side errors
      return NextResponse.json({
        heading: sanitizedData.church_info_heading,
        date: sanitizedData.church_info_date,
        bibleVerse: sanitizedData.church_info_bible_verse,
        bibleReference: sanitizedData.church_info_bible_reference,
        contacts: [],
        backgroundImage: sanitizedData.church_info_background_image,
      });
    }
  } catch (error) {
    console.error("Server error fetching church info section data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/services-events/church-info - Update church info section data
export async function PUT(request) {
  try {
    const body = await request.json();

    // Validate input data
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    // Safely map component state to database fields
    let dbData;
    try {
      dbData = mapChurchInfoSectionToDB(body);
    } catch (parseError) {
      console.error("Error mapping church info data to DB format:", parseError);
      return NextResponse.json(
        { error: "Failed to process input data" },
        { status: 400 }
      );
    }

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
        .select(
          "church_info_heading, church_info_date, church_info_bible_verse, church_info_bible_reference, church_info_contacts, church_info_background_image"
        );
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
          weekly_programs_heading:
            defaultServicesEventsData.weekly_programs_heading,
          weekly_programs_description:
            defaultServicesEventsData.weekly_programs_description,
          weekly_programs: defaultServicesEventsData.weekly_programs,
          monthly_programs_heading:
            defaultServicesEventsData.monthly_programs_heading,
          monthly_programs: defaultServicesEventsData.monthly_programs,
          upcoming_events_heading:
            defaultServicesEventsData.upcoming_events_heading,
          upcoming_events: defaultServicesEventsData.upcoming_events,
        })
        .select(
          "church_info_heading, church_info_date, church_info_bible_verse, church_info_bible_reference, church_info_contacts, church_info_background_image"
        );
    }

    const { data, error } = updateResult;

    if (error) {
      console.error("Error updating church info section data:", error);
      return NextResponse.json(
        { error: "Failed to update church info section data" },
        { status: 500 }
      );
    }

    // Ensure we have data to work with
    if (!data || !data[0]) {
      console.error("No data returned from update operation");
      return NextResponse.json(
        { error: "No data returned from update operation" },
        { status: 500 }
      );
    }

    // Safely map database fields back to component state
    try {
      const mappedData = mapDBToChurchInfoSection(data[0]);
      return NextResponse.json(mappedData);
    } catch (parseError) {
      console.error("Error mapping DB data to component state:", parseError);
      // Return the basic data that won't cause client-side errors
      return NextResponse.json({
        heading: data[0].church_info_heading || body.heading || "",
        date: data[0].church_info_date || body.date || "",
        bibleVerse: data[0].church_info_bible_verse || body.bibleVerse || "",
        bibleReference:
          data[0].church_info_bible_reference || body.bibleReference || "",
        contacts: body.contacts || [],
        backgroundImage:
          data[0].church_info_background_image || body.backgroundImage || "",
      });
    }
  } catch (error) {
    console.error("Server error updating church info section data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
