import { createClient } from "@/lib/supabase";
import { mapDBToWorshipWithUsSection, mapWorshipWithUsSectionToDB } from "@/lib/homeFormData";

export async function GET() {
  try {
    const supabase = createClient();

    // Fetch data from the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .select("worship_heading, worship_description, worship_buttons, worship_background_image")
      .single();

    if (error) {
      console.error("Error fetching worship with us section:", error);
      return Response.json(
        { error: "Failed to fetch worship with us section" },
        { status: 500 }
      );
    }

    // Map the database data to the component format
    const worshipData = mapDBToWorshipWithUsSection(data || {});

    return Response.json(worshipData);
  } catch (error) {
    console.error("Unexpected error in worship with us GET route:", error);
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
    const dbData = mapWorshipWithUsSectionToDB(formData);

    // Update the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .update(dbData)
      .eq("id", 1) // Assuming there's only one record in the home_page table
      .select();

    if (error) {
      console.error("Error updating worship with us section:", error);
      return Response.json(
        { error: "Failed to update worship with us section" },
        { status: 500 }
      );
    }

    // Map the updated data back to the component format
    const updatedWorshipData = mapDBToWorshipWithUsSection(data[0] || {});

    return Response.json(updatedWorshipData);
  } catch (error) {
    console.error("Unexpected error in worship with us PUT route:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
