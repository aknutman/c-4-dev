import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dummy data for blog posts
const posts = [
  {
    slug: "welcome-to-ghost-replica",
    title: "Welcome to Ghost Replica",
    excerpt: "This is a clone of Ghost CMS built with Next.js and shadcn/ui. It aims to provide a clean and minimal reading experience.",
    author: "Admin",
    date: "2024-05-20",
    tags: ["News", "Announcements"],
  },
  {
    slug: "building-with-nextjs",
    title: "Building modern apps with Next.js",
    excerpt: "Next.js 14 brings server components and server actions to the forefront, making full-stack React development more intuitive.",
    author: "Jane Doe",
    date: "2024-05-18",
    tags: ["Tech", "Next.js"],
  },
  {
    slug: "power-of-shadcn",
    title: "The power of shadcn/ui",
    excerpt: "Why copy-paste components are the future of UI libraries. Customization without the bloat of traditional component libraries.",
    author: "John Smith",
    date: "2024-05-15",
    tags: ["Design", "UI"],
  }
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">Ghost Replica</h1>
        <p className="text-xl text-muted-foreground">Thoughts, stories and ideas.</p>
      </header>

      <main className="space-y-8">
        {posts.map((post) => (
          <Link href={`/post/${post.slug}`} key={post.slug} className="block group">
            <Card className="border-none shadow-none hover:bg-muted/50 transition-colors bg-transparent">
              <CardHeader>
                <div className="flex gap-2 mb-2">
                  {post.tags.map(tag => (
                    <Badge variant="secondary" key={tag}>{tag}</Badge>
                  ))}
                </div>
                <CardTitle className="text-3xl font-bold group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{post.author}</p>
                    <p className="text-muted-foreground">{post.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </main>
    </div>
  );
}
