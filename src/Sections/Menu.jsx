import React from 'react';
import gbebe from "../assets/Images/gbebe.jpg"
import fufu from "../assets/Images/fufu.jpeg"
import kenkey from "../assets/Images/kenkey.jpeg"
import jallof from "../assets/Images/jallof.jpeg"
import warchie from "../assets/Images/warchie.jpeg"
import tz from "../assets/Images/tz.jpeg"
import banku from "../assets/Images/banku.jpg"

// Sample data array of food items
const foodItems = [
  {
    name: "Banku",
    vendor: "Vendor A",
    price: "₵5",
    image: banku,
  },
  {
    name: "TZ",
    vendor: "Vendor B",
    price: "₵6",
    image: tz,
  },
  {
    name: "Kenkey",
    vendor: "Vendor C",
    price: "₵4",
    image: kenkey,
  },
  {
    name: "Warchie",
    vendor: "Vendor D",
    price: "₵7",
    image: warchie,
  },
  {
    name: "Jollof",
    vendor: "Vendor E",
    price: "₵8",
    image: jallof,
  },
  {
    name: "Fufu",
    vendor: "Vendor F",
    price: "₵5",
    image: fufu,
  },
  {
    name: "Gbebe",
    vendor: "Vendor G",
    price: "₵6",
    image: gbebe,
  },
];

// Item component
function Item({ name, vendor, price, image }) {
  return (
    <div className="item my-12">
      <img src={image} alt={name} className="object-cover w-full h-full" />
      <h2 className="text-xl font-semibold">{name}</h2>
      <p>Vendor: {vendor}</p>
      <p>Price: {price}</p>
    </div>
  );
}

// Menu component
export default function Menu() {
  return (
    <div className=" max-w-6xl mx-12 ">
      <h1 className="text-3xl text-center mb-6">Menu</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Render different food items using the Item component */}
        {foodItems.map((item, index) => (
          <Item key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
