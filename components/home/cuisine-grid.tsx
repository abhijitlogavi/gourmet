"use client";

import Link from "next/link"; // FIXED: Use Next.js Link
import { Card } from "../../components/ui/card";

const cuisines = [
  {
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1655471264223-b07ce84d521c?q=80&w=811&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Burgers",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Biryani",
    image: "https://images.unsplash.com/photo-1697276063790-a68a966b12f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Chinese",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "North Indian",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
  },
  {
    name: "South Indian",
    image: "https://images.unsplash.com/photo-1643268972535-a2b100ff3632?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Desserts",
    image: "https://plus.unsplash.com/premium_photo-1678198828975-02016abf2c5e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Healthy",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
];

export function CuisineGrid() {
  return (
    <section className="py-12" data-testid="cuisine-grid">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">What&rsquo;s on your mind?</h2>
            <p className="text-muted-foreground mt-1">Explore cuisines you love</p>
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {cuisines.map((cuisine) => (
            <Link
              key={cuisine.name}
              href={`/search?cuisine=${encodeURIComponent(cuisine.name)}`}
              className="block group" // Added class for proper hit area
            >
              <Card
                className={`cursor-pointer overflow-hidden hover-elevate transition-all duration-200`}
                data-testid={`cuisine-card-${cuisine.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={cuisine.image}
                    alt={cuisine.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-2 text-center">
                  <span className="text-sm font-medium">{cuisine.name}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}