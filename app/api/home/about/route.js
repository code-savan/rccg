import { createClient } from "@/lib/supabase";
import { mapDBToAboutSection, mapAboutSectionToDB } from "@/lib/homeFormData";

export async function GET() {
  try {
    const supabase = createClient();

    // Fetch data from the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .select("about_heading, about_content")
      .single();

    if (error) {
      console.error("Error fetching about section:", error);
      return Response.json(
        { error: "Failed to fetch about section" },
        { status: 500 }
      );
    }

    // Map the database data to the component format
    const aboutData = mapDBToAboutSection(data || {});

    return Response.json(aboutData);
  } catch (error) {
    console.error("Unexpected error in about section GET route:", error);
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
    const dbData = mapAboutSectionToDB(formData);

    // Update the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .update(dbData)
      .eq("id", 1) // Assuming there's only one record in the home_page table
      .select();

    if (error) {
      console.error("Error updating about section:", error);
      return Response.json(
        { error: "Failed to update about section" },
        { status: 500 }
      );
    }

    // Map the updated data back to the component format
    const updatedAboutData = mapDBToAboutSection(data[0] || {});

    return Response.json(updatedAboutData);
  } catch (error) {
    console.error("Unexpected error in about section PUT route:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
