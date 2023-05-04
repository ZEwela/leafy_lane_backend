import { Product } from "./models/productModel";
import { User } from "./models/userModel";
import bcrypt from "bcryptjs";

export const sampleProducts: Product[] = [
  {
    name: "Monstera Adansonii",
    slug: "monstera-adansonii",
    image: "../images/Monstera_Adansonii.jpg",
    category: "Plants",
    brand: "Monstera",
    price: 6.5,
    countInStock: 0,
    description: "Great plant for beginners",
    rating: 4.6,
    numReviews: 5,
  },
  {
    name: "Boston Fern",
    slug: "boston-fern",
    image: "../images/Boston_Fern.jpg",
    category: "Plants",
    brand: "Boston",
    price: 10.0,
    countInStock: 10,
    description: "Great plant for bathrooms",
    rating: 4.2,
    numReviews: 10,
  },
  {
    name: "Pilea",
    slug: "pilea",
    image: "../images/Pilea.jpg",
    category: "Plants",
    brand: "Boston",
    price: 15.0,
    countInStock: 15,
    description: "Most light conditions",
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Sansevieria Zeylanica",
    slug: "sansevieria-zeylanica",
    image: "../images/Snake_Plant.jpg",
    category: "Plants",
    brand: "Boston",
    price: 30.0,
    countInStock: 20,
    description: "Very drought tolerant",
    rating: 4.9,
    numReviews: 12,
  },
  {
    name: "Pinky",
    slug: "pinky",
    image: "../images/pink_long_pot.jpg",
    category: "Pots",
    brand: "Ceramica",
    price: 25.0,
    countInStock: 10,
    description: "20 cm",
    rating: 5,
    numReviews: 5,
  },
  {
    name: "Classic white",
    slug: "classic-white",
    image: "../images/simple_white_pot.jpg",
    category: "Pots",
    brand: "Ceramica",
    price: 20.0,
    countInStock: 12,
    description: "15 cm",
    rating: 4.5,
    numReviews: 8,
  },
];

export const sampleUsers: User[] = [
  {
    name: "Jane",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Judy",
    email: "user@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];
