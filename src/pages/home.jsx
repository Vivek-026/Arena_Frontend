import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  CalendarDaysIcon,
  MapPinIcon,
  TrophyIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  CreditCardIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  const steps = [
    {
      icon: <MapPinIcon className="w-10 h-10 text-green-600 mb-3" />,
      title: "Find Turf",
      desc: "Search for your preferred location and available time slot.",
    },
    {
      icon: <CalendarDaysIcon className="w-10 h-10 text-green-600 mb-3" />,
      title: "Book Slot",
      desc: "Select your preferred time and book instantly in seconds.",
    },
    {
      icon: <TrophyIcon className="w-10 h-10 text-green-600 mb-3" />,
      title: "Play!",
      desc: "Arrive at the turf and enjoy a seamless sports experience.",
    },
  ];

  const features = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-green-600" />,
      title: "Verified Turfs",
      desc: "All our turfs are verified and well maintained.",
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-green-600" />,
      title: "24/7 Support",
      desc: "Get help anytime from our dedicated support team.",
    },
    {
      icon: <CreditCardIcon className="w-8 h-8 text-green-600" />,
      title: "Secure Payments",
      desc: "Safe payment processing with multiple gateways.",
    },
    {
      icon: <DevicePhoneMobileIcon className="w-8 h-8 text-green-600" />,
      title: "Mobile Friendly",
      desc: "Book turfs on the go with a fully responsive platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[65vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/hero-bg-3.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative text-center px-4 text-white" data-aos="zoom-in">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Find Your Perfect Venue
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200 drop-shadow-sm">
            Book your favorite venue with just a few clicks
          </p>
          <Link
            to="/turf"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-base font-semibold transition-transform hover:scale-105 shadow-md"
          >
            Search Turfs
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-3xl font-extrabold text-center mb-12 text-gray-800"
            data-aos="fade-up"
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
              key={idx}
              className="text-center p-6 border border-green-500 rounded-2xl bg-white shadow-md hover:shadow-xl hover:ring-2 hover:ring-green-400 transition"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-700 text-sm">{step.desc}</p>
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-extrabold text-center mb-12 text-gray-800"
            data-aos="fade-up"
          >
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-green-500 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="flex items-center gap-3 mb-3">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
