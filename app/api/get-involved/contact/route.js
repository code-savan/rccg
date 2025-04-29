import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import {
  mapContactSectionToDB,
  mapDBToContactSection,
} from "@/lib/getInvolvedFormData";

// GET /api/get-involved/contact - Fetch contact section data
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("get_involved")
      .select(`
        contact_heading,
        contact_address,
        contact_subtext,
        contact_background_image,
        contact_form_enabled
      `)
      .single();

    if (error) {
      console.error("Error fetching contact section data:", error);
      return NextResponse.json(
        { error: "Failed to fetch contact section data" },
        { status: 500 }
      );
    }

    // Map database fields to component state
    const mappedData = mapDBToContactSection(data);
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error("Server error fetching contact section data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/get-involved/contact - Update contact section data
export async function PUT(request) {
  try {
    const body = await request.json();

    // Map component state to database fields
    const dbData = mapContactSectionToDB(body);

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
      contact_heading,
      contact_address,
      contact_subtext,
      contact_background_image,
      contact_form_enabled
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
          donation_heading: "Help the church grow",
          donation_description:
            "Giving is an act of worship and a way to make a difference in our community.",
          donation_bible_verse_text:
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
          donation_bible_verse_reference: "— 2 Corinthians 9:7 (NIV)",
          donation_bible_verse_background_image:
            "/images/img_verse_630x738.png",
          donation_button_text: "Give today",
          donation_link:
            "https://www.givelify.com/donate/redeemed-christian-church-of-god-rccg-rod-of-god-parish-indianapolis-in-2j7wy5NTU0/donation/amount",
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
        })
        .select(fieldsToSelect);
    }

    const { data, error } = updateResult;

    if (error) {
      console.error("Error updating contact section data:", error);
      return NextResponse.json(
        { error: "Failed to update contact section data" },
        { status: 500 }
      );
    }

    // Map database fields back to component state
    const mappedData = mapDBToContactSection(data[0]);
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error("Server error updating contact section data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
