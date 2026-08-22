"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

// Dummy data
const initialPosts = [
  { id: 1, title: "Welcome to Ghost Replica", status: "Published", date: "2024-05-20" },
  { id: 2, title: "Building modern apps with Next.js", status: "Published", date: "2024-05-18" },
  { id: 3, title: "The power of shadcn/ui", status: "Draft", date: "2024-05-15" },
];

export default function AdminPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [isCreating, setIsCreating] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newPost = {
      id: posts.length + 1,
      title: newTitle,
      status: "Draft",
      date: new Date().toISOString().split('T')[0]
    };

    setPosts([newPost, ...posts]);
    setIsCreating(false);
    setNewTitle("");
    setNewContent("");
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  if (isCreating) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Save Draft</Button>
          </div>
        </div>

        <div className="space-y-6">
          <Input
            placeholder="Post Title"
            className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 px-0 h-14"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Textarea
            placeholder="Start writing..."
            className="min-h-[500px] border-none shadow-none focus-visible:ring-0 px-0 resize-none text-lg"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground mt-1">Manage your blog content.</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="h-4 w-4" /> New Post
        </Button>
      </div>

      <Card>
        <div className="divide-y">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div>
                <h3 className="font-semibold text-lg">{post.title}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className={post.status === 'Published' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
                    {post.status}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No posts found. Create your first post!
            </div>
          )}
        </div>
      </Card>

      <div className="mt-8">
         <Button variant="outline" asChild>
            <Link href="/">View Live Site</Link>
         </Button>
      </div>
    </div>
  );
}
