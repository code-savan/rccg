import { createClient } from "@/lib/supabase";
import { mapDBToEventsSection, mapEventsSectionToDB } from "@/lib/homeFormData";

export async function GET() {
  try {
    const supabase = createClient();

    // Fetch data from the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .select("events_heading, events")
      .single();

    if (error) {
      console.error("Error fetching events section:", error);
      return Response.json(
        { error: "Failed to fetch events section" },
        { status: 500 }
      );
    }

    // Map the database data to the component format
    const eventsData = mapDBToEventsSection(data || {});

    return Response.json(eventsData);
  } catch (error) {
    console.error("Unexpected error in events GET route:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const supabase = createClient();
    const formData = await request.json();

    // Map the form data to the database format
    const dbData = mapEventsSectionToDB(formData);

    // Update the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .update(dbData)
      .eq("id", 1) // Assuming there's only one record in the home_page table
      .select();

    if (error) {
      console.error("Error updating events section:", error);
      return Response.json(
        { error: "Failed to update events section" },
        { status: 500 }
      );
    }

    // Map the updated data back to the component format
    const updatedEventsData = mapDBToEventsSection(data[0] || {});

    return Response.json(updatedEventsData);
  } catch (error) {
    console.error("Unexpected error in events PUT route:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
