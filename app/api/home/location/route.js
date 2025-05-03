import { createClient } from "@/lib/supabase";
import { mapDBToLocationSection, mapLocationSectionToDB } from "@/lib/homeFormData";

export async function GET() {
  try {
    const supabase = createClient();

    // Fetch data from the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .select("location_heading, location_description, location_address, location_map_url, location_image")
      .single();

    if (error) {
      console.error("Error fetching location section:", error);
      return Response.json(
        { error: "Failed to fetch location section" },
        { status: 500 }
      );
    }

    // Map the database data to the component format
    const locationData = mapDBToLocationSection(data || {});

    return Response.json(locationData);
  } catch (error) {
    console.error("Unexpected error in location GET route:", error);
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
    const dbData = mapLocationSectionToDB(formData);

    // Update the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .update(dbData)
      .eq("id", 1) // Assuming there's only one record in the home_page table
      .select();

    if (error) {
      console.error("Error updating location section:", error);
      return Response.json(
        { error: "Failed to update location section" },
        { status: 500 }
      );
    }

    // Map the updated data back to the component format
    const updatedLocationData = mapDBToLocationSection(data[0] || {});

    return Response.json(updatedLocationData);
  } catch (error) {
    console.error("Unexpected error in location PUT route:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
