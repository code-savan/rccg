import { createClient } from "@/lib/supabase";
import { mapDBToWelcomeHeroSection, mapWelcomeHeroSectionToDB } from "@/lib/homeFormData";

export async function GET() {
  try {
    const supabase = createClient();

    // Fetch data from the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .select("welcome_title, welcome_subtitle, welcome_button_text, welcome_bible_verses, welcome_background_image")
      .single();

    if (error) {
      console.error("Error fetching welcome hero section:", error);
      return Response.json(
        { error: "Failed to fetch welcome hero section" },
        { status: 500 }
      );
    }

    // Map the database data to the component format
    const welcomeHeroData = mapDBToWelcomeHeroSection(data || {});

    return Response.json(welcomeHeroData);
  } catch (error) {
    console.error("Unexpected error in welcome hero GET route:", error);
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
    const dbData = mapWelcomeHeroSectionToDB(formData);

    // Update the home_page table
    const { data, error } = await supabase
      .from("home_page")
      .update(dbData)
      .eq("id", 1) // Assuming there's only one record in the home_page table
      .select();

    if (error) {
      console.error("Error updating welcome hero section:", error);
      return Response.json(
        { error: "Failed to update welcome hero section" },
        { status: 500 }
      );
    }

    // Map the updated data back to the component format
    const updatedWelcomeHeroData = mapDBToWelcomeHeroSection(data[0] || {});

    return Response.json(updatedWelcomeHeroData);
  } catch (error) {
    console.error("Unexpected error in welcome hero PUT route:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
