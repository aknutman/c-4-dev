import Link from "next/link";
import { LayoutDashboard, FileText, Settings, User } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="border-r bg-muted/40 p-4 md:p-6 hidden md:block">
        <div className="mb-8">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
            <LayoutDashboard className="h-6 w-6" />
            <span>Admin</span>
          </Link>
        </div>
        <nav className="space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-primary/10 transition-all"
          >
            <FileText className="h-4 w-4" />
            Posts
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary transition-all"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary transition-all"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </nav>
      </aside>
      <main className="p-4 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
