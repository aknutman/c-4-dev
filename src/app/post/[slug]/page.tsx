import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// In a real app, this would fetch from a database or CMS API
const getPost = (slug: string) => {
  const posts = [
    {
      slug: "welcome-to-ghost-replica",
      title: "Welcome to Ghost Replica",
      content: `
        <p>This is a clone of Ghost CMS built with Next.js and shadcn/ui. It aims to provide a clean and minimal reading experience.</p>
        <p>Ghost is known for its incredible writing experience and beautiful default themes. By combining Next.js App Router for server-side rendering and routing, with shadcn/ui for beautiful, accessible components, we can build a very capable replica.</p>
        <h2>Why Next.js?</h2>
        <p>Next.js provides an excellent developer experience and great performance out of the box. With features like Image Optimization, Font Optimization, and Server Components, it's perfect for a content-heavy site like a blog.</p>
        <h2>Why shadcn/ui?</h2>
        <p>Instead of a traditional component library where you install a package and are locked into their API, shadcn/ui provides sensible defaults that you can copy and paste into your project. This gives you complete control over the code and styling.</p>
      `,
      author: "Admin",
      date: "2024-05-20",
      tags: ["News", "Announcements"],
    },
    {
      slug: "building-with-nextjs",
      title: "Building modern apps with Next.js",
      content: "<p>Next.js 14 brings server components and server actions to the forefront, making full-stack React development more intuitive. Content goes here...</p>",
      author: "Jane Doe",
      date: "2024-05-18",
      tags: ["Tech", "Next.js"],
    },
    {
      slug: "power-of-shadcn",
      title: "The power of shadcn/ui",
      content: "<p>Why copy-paste components are the future of UI libraries. Customization without the bloat of traditional component libraries. Content goes here...</p>",
      author: "John Smith",
      date: "2024-05-15",
      tags: ["Design", "UI"],
    }
  ];
  return posts.find(p => p.slug === slug) || null;
};

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-8 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to posts
          </Link>
        </Button>

        <div className="flex gap-2 mb-6">
          {post.tags.map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          {post.title}
        </h1>

        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.author}</p>
            <p className="text-sm text-muted-foreground">{post.date}</p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
