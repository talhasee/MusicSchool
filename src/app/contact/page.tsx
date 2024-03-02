"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { BackgroundBeams } from "@/components/ui/background-beams";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  messsage: z
    .string()
    .min(10, {
      message: "Message should be atleast 10 characters.",
    })
    .max(200, {
      message: "Message must not be longer than 200 characters.",
    }),
});

function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      messsage: "",
    },
  });

  function generateDateString() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const dayOfWeek = days[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    let hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";

    // Convert hour from 24-hour format to 12-hour format
    hour = hour % 12 || 12;

    const dateString = `${dayOfWeek}, ${month} ${day}, ${year} at ${hour}:${
      minute < 10 ? "0" : ""
    }${minute} ${period}`;
    return dateString;
  }

  const handleSubmit = () => {
    console.log("Submitted");
  };


  return (
    <main className="flex items-center justify-center h-screen relative py-12 pt-36 ">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0"/>
      <div className="flex flex-col items-center justify-center lg:w-[80rem] sm:w-[20rem]">
        <p className="text-4xl lg:pt-10 sm:pt-16 lg:text-6xl font-sans font-bold">Contact Page</p>
        <p className="py-8 px-16 sm:px-0 max-w-[50rem] lg:w-full md:w-[45rem] sm:w-[40rem] text-base md:text-lg text-center text-gray-500 font-bold">
          We are here to help with any questions about courses, programs, or
          events. Reach out and lets us know how we can assist you in your
          musical journey.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-5xl w-96 lg:w-full md:w-[45rem] sm:w-[40rem] sm:px-10 flex flex-col gap-4 z-10"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email Address"
                        type="email"
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="messsage"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Enter your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message here"
                        className="h-[16rem]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button
              variant={"outline"}
              typeof="submit"
              className="w-[10rem] bg-gray-700 mt-4"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default Page;
