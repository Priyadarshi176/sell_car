export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: "excellent" | "good" | "fair" | "poor";
  price: number;
  description: string;
  imageUrls: string[];
  seller: string;
  zipCode: string;
};
