import Link from "next/link";
import Image from "next/image";
import type { Car } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gauge, CalendarDays, Wrench, ArrowRight } from "lucide-react";

type CarCardProps = {
  car: Car;
};

export default function CarCard({ car }: CarCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={car.imageUrls[0]}
            alt={`${car.make} ${car.model}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint={`${car.make} ${car.model}`}
          />
        </div>
        <div className="p-4">
          <CardTitle className="font-headline text-xl">
            <Link href={`/listings/${car.id}`} className="hover:text-primary transition-colors">
              {car.year} {car.make} {car.model}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 px-4">
        <div className="text-2xl font-bold text-primary">
          ${car.price.toLocaleString()}
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4" />
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wrench className="w-4 h-4" />
            <span className="capitalize">{car.condition}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/30">
        <Button asChild className="w-full" size="sm">
          <Link href={`/listings/${car.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
