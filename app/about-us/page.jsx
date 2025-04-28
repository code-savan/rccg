import React from "react";
import Image from "next/image";

export const metadata = {
  title: "About RCCG Rod Of God Parish - Our Mission and Ministry",
  description:
    "Learn about RCCG Rod Of God Parish\\'s mission to spread the love of Christ. Discover our history, ministries, and how you can get involved in our community.",
  //ogTitle:'...'
};

export default function AboutUsPage() {
  // This would typically come from your CMS or API
  const aboutContent = {
    heading: "About RCCG Rod of God Parish",
    description:
      "Welcome to the Redeemed Christian Church of God (RCCG) Rod of God Parish. We are a vibrant, Spirit-filled community dedicated to spreading the gospel of Jesus Christ and making a positive impact in Indianapolis.",
    mission: {
      title: "Our Mission",
      text: "To make heaven, to take as many people as possible with us, to have a member of RCCG in every family of all nations, and to accomplish this by planting churches within five minutes walking distance in every city and town of developing countries and within ten minutes driving distance in every city and town of developed countries.",
    },
    vision: {
      title: "Our Vision",
      text: "To spread the Word of God to all nations, nurture believers to become disciples of Christ, and create a spiritual environment where God's presence dwells.",
    },
    beliefs: [
      {
        id: 1,
        title: "The Bible",
        description:
          "We believe the Bible is the inspired and only infallible Word of God.",
      },
      {
        id: 2,
        title: "One God",
        description:
          "We believe in one God, eternally existing in three persons: God the Father, God the Son, and God the Holy Spirit.",
      },
      {
        id: 3,
        title: "Salvation",
        description:
          "We believe in salvation by grace through faith in Jesus Christ, resulting in the new birth.",
      },
    ],
    history: {
      title: "Our History",
      text: "RCCG Rod of God Parish was established with a divine mandate to bring the message of salvation to Indianapolis. Since our inception, we have grown into a thriving community of believers committed to God's work.",
    },
    contact: {
      address: "123 Church Street, Indianapolis, IN 46201",
      email: "info@rccgrodofgod.org",
      phone: "(317) 555-0123",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gray-900">
        <Image
          src="/images/about-hero.jpg"
          alt="Church building"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {aboutContent.heading}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {aboutContent.description}
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {aboutContent.mission.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {aboutContent.mission.text}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {aboutContent.vision.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {aboutContent.vision.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Beliefs Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Beliefs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {aboutContent.beliefs.map((belief) => (
              <div
                key={belief.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {belief.title}
                </h3>
                <p className="text-gray-600">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {aboutContent.history.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {aboutContent.history.text}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-4 text-lg">
              <p className="flex items-center text-gray-600">
                <svg
                  className="w-6 h-6 mr-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {aboutContent.contact.address}
              </p>
              <p className="flex items-center text-gray-600">
                <svg
                  className="w-6 h-6 mr-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {aboutContent.contact.email}
              </p>
              <p className="flex items-center text-gray-600">
                <svg
                  className="w-6 h-6 mr-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {aboutContent.contact.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
