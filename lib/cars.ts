export type Car = {
  name: string;
  model: string;
  year: number;
  price: string;
  features: string[];
  slug: string;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const base = [
  {
    name: "Toyota RAV4",
    model: "Hybrid AWD",
    year: 2022,
    price: "$32,500",
    features: [
      "AWD",
      "2.5L Hybrid Engine",
      "Automatic",
      "CarPlay",
      "Lane Assist",
    ],
  },
  {
    name: "Honda CR-V",
    model: "Touring Edition",
    year: 2023,
    price: "$30,800",
    features: [
      "FWD",
      "Turbocharged Engine",
      "Adaptive Cruise Control",
      "Heated Seats",
      "Blind Spot Monitor",
    ],
  },
  {
    name: "Mazda CX-5",
    model: "Signature",
    year: 2021,
    price: "$31,200",
    features: [
      "AWD",
      "2.5 Turbo",
      "Leather Interior",
      "Bose Audio",
      "Heads-Up Display",
    ],
  },
  {
    name: "Subaru Forester",
    model: "Premium Edition",
    year: 2020,
    price: "$28,900",
    features: [
      "AWD",
      "Eyesight Safety Suite",
      "Panoramic Roof",
      "Android Auto",
      "Remote Start",
    ],
  },
  {
    name: "Hyundai Tucson",
    model: "Hybrid Limited",
    year: 2024,
    price: "$33,600",
    features: [
      "Hybrid Powertrain",
      "AWD",
      "Smart Cruise",
      "Remote Parking",
      "Wireless Charging",
    ],
  },
  {
    name: "Ford Escape",
    model: "Titanium",
    year: 2022,
    price: "$29,500",
    features: [
      "Plug-in Hybrid",
      "AWD",
      "Apple CarPlay",
      "Hands-Free Tailgate",
      "Adaptive Headlights",
    ],
  },
  {
    name: "Kia Sportage",
    model: "EX Hybrid",
    year: 2023,
    price: "$31,100",
    features: [
      "AWD",
      "Panoramic Roof",
      "Voice Command",
      "Navigation",
      "Parking Sensors",
    ],
  },
];

export const cars: Car[] = base.map((c) => ({ ...c, slug: slugify(c.name) }));
export { slugify };
