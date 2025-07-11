"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, LayoutGrid, ListPlus } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline">AutoList</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Listings
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Dashboard
              </Link>
            </Button>
          </nav>
          <Button asChild>
            <Link href="/list-car">
              <ListPlus className="mr-2 h-4 w-4" />
              List a Car
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
