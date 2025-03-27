"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AddHouseForm from "./../../../../components/HousePage/AddHouse";
import HouseCard from "./../../../../components/HousePage/HouseCard";
const ManageHousePage = () => {
  const demoHouses = [
    {
      id: "1",
      houseName: "Modern Apartment",
      address: "123 Green Street, NY",
      category: "Apartment",
      tenantType: "Family",
      quantity: 1,
      rentFee: 1200,
      minBookingCharge: 300,
      details: "A luxurious modern apartment with 3 bedrooms and a balcony.",
      images: [
        {
          url: "https://www.thetolet.com/storage/property_images/82203/property_jXoDNDNWz.webp",
        },
      ],
      video: null,
      status: "AVAILABLE",
      houseOwner: {
        id: "101",
        name: "Alice Johnson",
        photo: "/users/alice.jpg",
      },
    },
    {
      id: "2",
      houseName: "Cozy Studio",
      address: "456 Downtown Ave, TX",
      category: "Studio",
      tenantType: "Single",
      quantity: 1,
      rentFee: 800,
      minBookingCharge: 200,
      details: "A compact and stylish studio for comfortable living.",
      images: [
        {
          url: "https://www.thetolet.com/storage/property_images/82203/property_jXoDNDNWz.webp",
        },
      ],
      video: null,
      status: "RENTED",
      houseOwner: {
        id: "102",
        name: "Michael Smith",
        photo: "/users/michael.jpg",
      },
    },
    {
      id: "3",
      houseName: "Luxury Villa",
      address: "789 Sunset Blvd, LA",
      category: "Villa",
      tenantType: "Family",
      quantity: 1,
      rentFee: 5000,
      minBookingCharge: 1000,
      details: "A stunning luxury villa with a private pool.",
      images: [
        {
          url: "https://www.thetolet.com/storage/property_images/82203/property_jXoDNDNWz.webp",
        },
      ],
      video: null,
      status: "AVAILABLE",
      houseOwner: {
        id: "103",
        name: "Sophia Martinez",
        photo: "/users/sophia.jpg",
      },
    },
    {
      id: "4",
      houseName: "Beach House",
      address: "Ocean Drive, Miami",
      category: "House",
      tenantType: "Family",
      quantity: 1,
      rentFee: 3500,
      minBookingCharge: 700,
      details: "A beautiful house with a breathtaking ocean view.",
      images: [
        {
          url: "https://www.thetolet.com/storage/property_images/82203/property_jXoDNDNWz.webp",
        },
      ],
      video: null,
      status: "AVAILABLE",
      houseOwner: {
        id: "104",
        name: "James Wilson",
        photo: "/users/james.jpg",
      },
    },
    {
      id: "5",
      houseName: "Small Cottage",
      address: "Countryside, CO",
      category: "Cottage",
      tenantType: "Couple",
      quantity: 1,
      rentFee: 1000,
      minBookingCharge: 250,
      details: "A cozy cottage perfect for a peaceful retreat.",
      images: [
        {
          url: "https://www.thetolet.com/storage/property_images/82203/property_jXoDNDNWz.webp",
        },
      ],
      video: null,
      status: "RENTED",
      houseOwner: { id: "105", name: "Emma Brown", photo: "/users/emma.jpg" },
    },
    {
      id: "6",
      houseName: "Penthouse Suite",
      address: "Skyline Towers, Chicago",
      category: "Penthouse",
      tenantType: "Executive",
      quantity: 1,
      rentFee: 7000,
      minBookingCharge: 1500,
      details: "A high-end penthouse with a rooftop terrace.",
      images: [
        {
          url: "https://www.thetolet.com/storage/property_images/82203/property_jXoDNDNWz.webp",
        },
      ],
      video: null,
      status: "AVAILABLE",
      houseOwner: {
        id: "106",
        name: "Olivia Davis",
        photo: "/users/olivia.jpg",
      },
    },
    {
      id: "7",
      houseName: "Urban Loft",
      address: "Main Street, Seattle",
      category: "Loft",
      tenantType: "Single",
      quantity: 1,
      rentFee: 1500,
      minBookingCharge: 400,
      details: "A stylish loft with an industrial design.",
      images: [
        {
          url: "https://www.thetolet.com/storage/property_images/82203/property_jXoDNDNWz.webp",
        },
      ],
      video: null,
      status: "AVAILABLE",
      houseOwner: {
        id: "107",
        name: "William Clark",
        photo: "/users/william.jpg",
      },
    },
    {
      id: "8",
      houseName: "Farmhouse",
      address: "Riverside, TX",
      category: "Farmhouse",
      tenantType: "Family",
      quantity: 1,
      rentFee: 2500,
      minBookingCharge: 600,
      details: "A spacious farmhouse with a huge backyard.",
      images: [
        {
          url: "https://www.thetolet.com/storage/property_images/82203/property_jXoDNDNWz.webp",
        },
      ],
      video: null,
      status: "RENTED",
      houseOwner: {
        id: "108",
        name: "Benjamin White",
        photo: "/users/benjamin.jpg",
      },
    },
    {
      id: "9",
      houseName: "Suburban Duplex",
      address: "Maple Lane, NJ",
      category: "Duplex",
      tenantType: "Family",
      quantity: 2,
      rentFee: 1800,
      minBookingCharge: 450,
      details: "A family-friendly duplex in a quiet neighborhood.",
      images: [
        {
          url: "https://www.thetolet.com/storage/property_images/82203/property_jXoDNDNWz.webp",
        },
      ],
      video: null,
      status: "AVAILABLE",
      houseOwner: {
        id: "109",
        name: "Charlotte Green",
        photo: "/users/charlotte.jpg",
      },
    },
    {
      id: "10",
      houseName: "Classic Bungalow",
      address: "Heritage Street, Boston",
      category: "Bungalow",
      tenantType: "Couple",
      quantity: 1,
      rentFee: 2000,
      minBookingCharge: 500,
      details: "A charming bungalow with a beautiful front porch.",
      images: [
        {
          url: "https://www.thetolet.com/storage/property_images/82203/property_jXoDNDNWz.webp",
        },
      ],
      video: null,
      status: "AVAILABLE",
      houseOwner: {
        id: "110",
        name: "Daniel Carter",
        photo: "/users/daniel.jpg",
      },
    },
  ];
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setOpen(false);
    reset();
  };

  return (
    <div className="min-h-screen container mx-auto">
      <h2 className="mt-10 text-center text-2xl font-medium">My Houses</h2>
      <AddHouseForm />

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 lg:grid-cols-4 gap-6 mb-5">
        {demoHouses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default ManageHousePage;
