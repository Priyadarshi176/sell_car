"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { mockCars } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Gauge, Wrench, MapPin, User, Mail, MessageSquare } from "lucide-react";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const id = params.id;
  const car = mockCars.find((c) => c.id === parseInt(id));

  if (!car) {
    notFound();
  }

  const handleInquirySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Inquiry Sent!",
      description: `Your message about the ${car.year} ${car.make} ${car.model} has been sent.`,
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Image Carousel */}
        <Card className="overflow-hidden shadow-lg">
          <Carousel>
            <CarouselContent>
              {car.imageUrls.map((url, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-96 w-full">
                    <Image
                      src={url}
                      alt={`${car.make} ${car.model} - Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={`${car.make} ${car.model}`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body leading-relaxed">{car.description}</p>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 space-y-8">
        {/* Main Details */}
        <Card>
          <CardHeader>
            <h1 className="font-headline text-3xl font-bold">{car.year} {car.make} {car.model}</h1>
            <p className="text-3xl font-bold text-primary">${car.price.toLocaleString()}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Gauge className="w-5 h-5 text-primary" /> <span>{car.mileage.toLocaleString()} mi</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><CalendarDays className="w-5 h-5 text-primary" /> <span>{car.year}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Wrench className="w-5 h-5 text-primary" /> <span className="capitalize">{car.condition}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-5 h-5 text-primary" /> <span>Zip: {car.zipCode}</span></div>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-muted-foreground"/>
                <span className="font-medium">Sold by {car.seller}</span>
            </div>
          </CardContent>
        </Card>

        {/* Inquiry Form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Contact Seller</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="name" placeholder="Your Name" required className="pl-9"/>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Your Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="Your Email" required className="pl-9"/>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                 <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea id="message" placeholder={`I'm interested in the ${car.year} ${car.make} ${car.model}...`} required className="pl-9"/>
                 </div>
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
