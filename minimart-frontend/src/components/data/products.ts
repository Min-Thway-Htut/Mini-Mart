import type { Product } from "../types";
import chocolateCookies from "../../images/products/chocolate-cookies.webp";
import orangeJuice from "../../images/products/orange-juice.png";
import sandwich from "../../images/products/sandwich.png";

export const products: Product[] = [
  {
    id: 1,
    name: "Chocolate Chip Cookies",
    category: "Snacks",
    price: 3.5,
    description: "Delicious homemade chocolate chip cookies.",
    image: chocolateCookies,
  },
  {
    id: 2,
    name: "Fresh Orange Juice",
    category: "Drinks",
    price: 2.0,
    description: "100% fresh orange juice, no preservatives.",
    image: orangeJuice,
  },
  {
    id: 3,
    name: "Veggie Sandwich",
    category: "Food",
    price: 4.5,
    description: "Healthy sandwich with fresh vegetables.",
    image: sandwich,
  },
];
