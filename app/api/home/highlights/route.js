import { createClient } from "@/lib/supabase";
import { mapDBToHighlightsSection, mapHighlightsSectionToDB } from "@/lib/homeFormData";

export async function GET() {
  try {
    const supabase = createClient();

    // Fetch data from the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .select("highlights_heading, highlights_description, highlights")
      .single();

    if (error) {
      console.error("Error fetching highlights section:", error);
      return Response.json(
        { error: "Failed to fetch highlights section" },
        { status: 500 }
      );
    }

    // Map the database data to the component format
    const highlightsData = mapDBToHighlightsSection(data || {});

    return Response.json(highlightsData);
  } catch (error) {
    console.error("Unexpected error in highlights GET route:", error);
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
    const dbData = mapHighlightsSectionToDB(formData);

    // Update the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .update(dbData)
      .eq("id", 1) // Assuming there's only one record in the home_page table
      .select();

    if (error) {
      console.error("Error updating highlights section:", error);
      return Response.json(
        { error: "Failed to update highlights section" },
        { status: 500 }
      );
    }

    // Map the updated data back to the component format
    const updatedHighlightsData = mapDBToHighlightsSection(data[0] || {});

    return Response.json(updatedHighlightsData);
  } catch (error) {
    console.error("Unexpected error in highlights PUT route:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
