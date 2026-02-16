export interface Product {
    id: number;
    name: string;
    category: "Food" | "Drinks" | "Snacks";
    price: number;
    description: string;
    image: string;
}