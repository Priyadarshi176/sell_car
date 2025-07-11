"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { mockCars } from "@/lib/data";
import type { Car } from "@/lib/types";
import CarCard from "@/components/car-card";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [make, setMake] = useState("all");
  const [model, setModel] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const uniqueMakes = useMemo(() => ["all", ...new Set(mockCars.map((car) => car.make))], []);
  const uniqueModels = useMemo(() => {
    if (make === "all") {
      return ["all", ...new Set(mockCars.map((car) => car.model))];
    }
    return ["all", ...new Set(mockCars.filter((car) => car.make === make).map((car) => car.model))];
  }, [make]);

  const filteredCars = useMemo(() => {
    return mockCars.filter((car) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        car.make.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower) ||
        car.year.toString().includes(searchLower);
      const matchesMake = make === "all" || car.make === make;
      const matchesModel = model === "all" || car.model === model;
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      return matchesSearch && matchesMake && matchesModel && matchesPrice;
    });
  }, [search, make, model, priceRange]);

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Find Your Next Car</h1>
        <p className="text-lg text-muted-foreground">Browse our curated selection of quality used cars.</p>
      </header>

      <Card className="shadow-lg">
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium mb-1">Search Make, Model, or Year</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="e.g. Toyota Camry 2022"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="make" className="block text-sm font-medium mb-1">Make</label>
              <Select value={make} onValueChange={(value) => { setMake(value); setModel("all"); }}>
                <SelectTrigger id="make">
                  <SelectValue placeholder="Select Make" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueMakes.map((m) => (
                    <SelectItem key={m} value={m}>{m === 'all' ? 'All Makes' : m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium mb-1">Model</label>
              <Select value={model} onValueChange={setModel} disabled={make === 'all'}>
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueModels.map((m) => (
                    <SelectItem key={m} value={m}>{m === 'all' ? 'All Models' : m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 lg:col-span-4">
               <label className="block text-sm font-medium mb-2">Price Range</label>
               <div className="flex items-center gap-4">
                 <span className="text-sm font-medium text-primary">${priceRange[0].toLocaleString()}</span>
                 <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100000}
                    step={1000}
                 />
                 <span className="text-sm font-medium text-primary">${priceRange[1].toLocaleString()}</span>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car: Car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-headline font-semibold">No Cars Found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}
