import { createClient } from "@/lib/supabase";
import { mapDBToMinistersSection, mapMinistersSectionToDB } from "@/lib/homeFormData";

export async function GET() {
  try {
    const supabase = createClient();

    // Fetch data from the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .select("ministers_heading, ministers_description, ministers, ministers_button_text, ministers_button_link")
      .single();

    if (error) {
      console.error("Error fetching ministers section:", error);
      return Response.json(
        { error: "Failed to fetch ministers section" },
        { status: 500 }
      );
    }

    // Map the database data to the component format
    const ministersData = mapDBToMinistersSection(data || {});

    return Response.json(ministersData);
  } catch (error) {
    console.error("Unexpected error in ministers GET route:", error);
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
    const dbData = mapMinistersSectionToDB(formData);

    // Update the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .update(dbData)
      .eq("id", 1) // Assuming there's only one record in the home_page table
      .select();

    if (error) {
      console.error("Error updating ministers section:", error);
      return Response.json(
        { error: "Failed to update ministers section" },
        { status: 500 }
      );
    }

    // Map the updated data back to the component format
    const updatedMinistersData = mapDBToMinistersSection(data[0] || {});

    return Response.json(updatedMinistersData);
  } catch (error) {
    console.error("Unexpected error in ministers PUT route:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
