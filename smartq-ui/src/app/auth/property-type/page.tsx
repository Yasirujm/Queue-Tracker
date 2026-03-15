"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function PropertyTypePage() {
  const router = useRouter();

  const propertyTypes = [
    {
      title: "Homes",
      description: "Vacation homes, villas, and entire houses.",
      icon: "🏠", // you can replace with svg later
    },
    {
      title: "Apartment",
      description: "Furnished apartments and flats rented as a whole unit.",
      icon: "🏢",
    },
    {
      title: "Hotels",
      description: "Hotels, B&Bs, guest houses, hostels, and resorts.",
      icon: "🏨",
    },
    {
      title: "Unique Places",
      description: "Treehouses, cottages, boats, luxury tents, and more.",
      icon: "🌲",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Main */}
      <div className="flex-1 flex flex-col items-center px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center mb-6">
          What type of property are you listing?
        </h1>
        <div className="border-t border-gray-800 pt-6">
        <div className="w-full max-w-2xl grid grid-cols-2 md:grid-cols-2 gap-6 mt-10">
          {propertyTypes.map((item) => (
            <div
              key={item.title}
              className="border-2 border-purple-300 rounded-xl p-4 cursor-pointer hover:border-purple-500 transition"
            >
                
              <div className="text-4xl mb-4">{item.icon}</div>
              <h2 className="font-bold text-lg mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
    

        {/* Buttons */}
        <div className="border-t border-gray-800 pt-6 mt-10 w-full flex justify-center">
        <div className="flex justify-between w-full max-w-4xl mt-12">
          <button
            onClick={() => router.back()}
            className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-medium"
          >
            Previous
          </button>
          <button
            onClick={() => router.push("/auth/Join-now")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Continue
          </button>
        </div>
        </div>
        </div>
      </div>

      
    </div>
  );
}
