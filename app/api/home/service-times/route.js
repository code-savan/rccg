import { createClient } from "@/lib/supabase";
import { mapDBToServiceTimesSection, mapServiceTimesSectionToDB } from "@/lib/homeFormData";

export async function GET() {
  try {
    const supabase = createClient();

    // Fetch data from the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .select("service_times_heading, service_times_description, services, service_times_see_more_text, service_times_see_more_link")
      .single();

    if (error) {
      console.error("Error fetching service times section:", error);
      return Response.json(
        { error: "Failed to fetch service times section" },
        { status: 500 }
      );
    }

    // Map the database data to the component format
    const serviceTimesData = mapDBToServiceTimesSection(data || {});

    return Response.json(serviceTimesData);
  } catch (error) {
    console.error("Unexpected error in service times GET route:", error);
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
    const dbData = mapServiceTimesSectionToDB(formData);

    // Update the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .update(dbData)
      .eq("id", 1) // Assuming there's only one record in the home_page table
      .select();

    if (error) {
      console.error("Error updating service times section:", error);
      return Response.json(
        { error: "Failed to update service times section" },
        { status: 500 }
      );
    }

    // Map the updated data back to the component format
    const updatedServiceTimesData = mapDBToServiceTimesSection(data[0] || {});

    return Response.json(updatedServiceTimesData);
  } catch (error) {
    console.error("Unexpected error in service times PUT route:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
