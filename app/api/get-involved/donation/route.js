import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import {
  mapDonationSectionToDB,
  mapDBToDonationSection,
} from "@/lib/getInvolvedFormData";

// GET /api/get-involved/donation - Fetch donation section data
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("get_involved")
      .select(
        `
        donation_heading,
        donation_description,
        donation_bible_verse_text,
        donation_bible_verse_reference,
        donation_bible_verse_background_image,
        donation_button_text,
        donation_link
      `
      )
      .single();

    if (error) {
      console.error("Error fetching donation section data:", error);
      return NextResponse.json(
        { error: "Failed to fetch donation section data" },
        { status: 500 }
      );
    }

    // Map database fields to component state
    const mappedData = mapDBToDonationSection(data);
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error("Server error fetching donation section data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/get-involved/donation - Update donation section data
export async function PUT(request) {
  try {
    const body = await request.json();

    // Map component state to database fields
    const dbData = mapDonationSectionToDB(body);

    // Find the record to update
    const { data: existingData, error: fetchError } = await supabase
      .from("get_involved")
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
    const fieldsToSelect = `
      donation_heading,
      donation_description,
      donation_bible_verse_text,
      donation_bible_verse_reference,
      donation_bible_verse_background_image,
      donation_button_text,
      donation_link
    `;

    if (existingData?.id) {
      // Update existing record
      updateResult = await supabase
        .from("get_involved")
        .update(dbData)
        .eq("id", existingData.id)
        .select(fieldsToSelect);
    } else {
      // Insert new record with default values for other sections
      updateResult = await supabase
        .from("get_involved")
        .insert({
          ...dbData,
          // Add default values for other required fields
          hero_heading: "Get involved\nwith the church",
          hero_subheading: "At RCCG Rod of God Parish, we accept everyone.",
          hero_background_image: "/images/img_group_227.png",
          qa_heading: "Q&A and Polls",
          qa_description:
            "We take questions from our members anonymously and answer them as a community to help them grow.",
          qa_button_text: "Go to the Q&A",
          qa_button_link:
            "https://app.sli.do/event/qiPxPF7zvmaw6UxmMY9kMC/live/questions",
          qa_bible_verse_text:
            "Carry each other's burdens, and in this way you will fulfill the law of Christ.",
          qa_bible_verse_reference: "— Galatians 6:2 (NIV)",
          qa_bible_verse_background_image: "/images/img_verse_1.png",
          contact_heading: "The Church Address",
          contact_address: "5350 Allied Blvd, Indianapolis, IN",
          contact_subtext: "Visit and Worship with us.",
          contact_background_image: "/images/img_group_138.png",
          contact_form_enabled: true,
        })
        .select(fieldsToSelect);
    }

    const { data, error } = updateResult;

    if (error) {
      console.error("Error updating donation section data:", error);
      return NextResponse.json(
        { error: "Failed to update donation section data" },
        { status: 500 }
      );
    }

    // Map database fields back to component state
    const mappedData = mapDBToDonationSection(data[0]);
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error("Server error updating donation section data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
