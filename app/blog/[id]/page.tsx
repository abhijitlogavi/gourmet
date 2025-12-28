"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

// Mock Data for Full Blog Posts
const blogContent: Record<string, { title: string; category: string; date: string; content: React.ReactNode; author: string; readTime: string }> = {
  "1": {
    title: "Top 10 Dishes to Try in Mumbai",
    category: "Food Trends",
    date: "Dec 25, 2025",
    author: "Abhijit Logavi",
    readTime: "5 min read",
    content: (
      <>
        <p>Mumbai, the financial capital of India, is also a melting pot of cultures and cuisines. From the iconic Vada Pav to the rich Pav Bhaji, the city offers a gastronomical journey like no other.</p>
        <h3>1. Benne Masala Dosa</h3>
        <p>No trip to Mumbai is complete without visiting CTR or Vidyarthi Bhavan. The crispy, butter-laden dosas are a breakfast staple that you simply cannot miss.</p>
        <h3>2. Idli Vada Dip</h3>
        <p>Soft fluffy idlis and crispy vadas dipped in a bowl of hot, flavorful sambar. It&rsquo;s the ultimate comfort food for any Mumbaikar.</p>
        <h3>3. Mangalorean Fish Curry</h3>
        <p>With its proximity to the coast, Mumbai hosts some amazing seafood restaurants. Try the Kane Rava Fry or the spicy Fish Curry with Neer Dosa.</p>
        <p><em>(This is a sample article for demonstration purposes.)</em></p>
      </>
    )
  },
  "2": {
    title: "The History of Biryani",
    category: "Culture",
    date: "Dec 25, 2025",
    author: "Pragati Ingale",
    readTime: "8 min read",
    content: (
      <>
        <p>Biryani is more than just a dish; it&rsquo;s an emotion. Originating from Persia and perfected in the royal kitchens of the Mughals, Biryani has traveled a long way to become India&rsquo;s favorite dish.</p>
        <h3>The Origins</h3>
        <p>The word &lsquo;Biryani&rsquo; comes from the Persian word &lsquo;Birian&rsquo;, which means &lsquo;fried before cooking&rsquo;. It was originally a dish for the army, providing a balanced meal of rice, meat, and spices.</p>
        <h3>Regional Varieties</h3>
        <p>From the spicy Hyderabadi Dum Biryani to the aromatic Lucknowi version, and the potato-loving Kolkata Biryani, every region in India has added its own twist to this classic.</p>
      </>
    )
  },
  "3": {
    title: "Healthy Eating on a Budget",
    category: "Health",
    date: "Dec 25, 2025",
    author: "Vivan Ahire",
    readTime: "4 min read",
    content: (
      <>
        <p>Eating healthy doesn&rsquo;t mean burning a hole in your pocket. With a little planning and smart choices, you can maintain a nutritious diet on a budget.</p>
        <h3>1. Buy Seasonal</h3>
        <p>Seasonal fruits and vegetables are not only fresher and tastier but also significantly cheaper than off-season produce.</p>
        <h3>2. Cook at Home</h3>
        <p>Ordering out frequently adds up. Preparing simple meals at home gives you control over ingredients and portion sizes while saving money.</p>
        <h3>3. Plant-Based Proteins</h3>
        <p>Lentils, chickpeas, and beans are excellent sources of protein that are much more affordable than meat.</p>
      </>
    )
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id as string;
  const post = blogContent[id];

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Button asChild>
          <Link href="/blog">Return to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all" asChild>
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="flex gap-2">
          <Badge>{post.category}</Badge>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-muted-foreground border-b pb-8">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {post.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none prose-lg leading-relaxed text-foreground/90">
          {post.content}
        </div>
      </div>
    </div>
  );
}