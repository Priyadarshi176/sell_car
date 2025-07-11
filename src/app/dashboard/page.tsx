"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCars } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Tag, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  const { toast } = useToast();

  const handleAction = (action: string, carName: string) => {
    toast({
      title: `Action: ${action}`,
      description: `${carName} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold font-headline text-center mb-8 text-primary">Your Listings</h1>
      <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">Manage your active car listings. You can edit details, remove a listing, or mark it as sold.</p>
      
      {mockCars.length > 0 ? (
        <div className="space-y-6">
          {mockCars.map((car) => (
            <Card key={car.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-1 relative h-48 md:h-full min-h-[150px]">
                  <Image
                    src={car.imageUrls[0]}
                    alt={`${car.make} ${car.model}`}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={`${car.make} ${car.model}`}
                  />
                </div>
                <div className="md:col-span-3">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-headline text-2xl">{car.year} {car.make} {car.model}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="capitalize">{car.condition}</Badge>
                          <span>&middot;</span>
                          <span>{car.mileage.toLocaleString()} mi</span>
                        </CardDescription>
                      </div>
                      <Badge variant="default" className="text-lg py-1 px-3">
                        ${car.price.toLocaleString()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-2">{car.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 bg-secondary/20 p-4">
                    <Button variant="outline" size="sm" onClick={() => handleAction("Marked as sold", `${car.year} ${car.make} ${car.model}`)}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Sold
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleAction("Removed", `${car.year} ${car.make} ${car.model}`)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-headline font-semibold">You have no active listings.</h2>
          <p className="text-muted-foreground mt-2">Ready to sell your car?</p>
          <Button asChild className="mt-4">
            <Link href="/list-car">Create a Listing</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
