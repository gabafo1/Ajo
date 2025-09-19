"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelpIcon, ArrowLeft } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

// Pricing plans with USD + NGN
const plans = [
  {
    title: "Free",
    description: "Perfect for individuals just getting started with group savings.",
    price: "₦0",
    highlight: "Basic features to manage your group savings with 10 members.",
    button: "Get Started",
    features: [
      "Up to 10 members",
      "Basic group savings",
      "Email support",
      "1 savings group",
    ],
  },
  {
    title: "Community",
    description: "Ideal for small groups that want collaboration and extra features.",
    price: "₦10,000",
    per: "/mo",
    highlight: "Up to 50 members, with reporting and reminders.",
    button: "Choose Community",
    features: [
      "Up to 50 members",
      "Advanced reporting",
      "Email & chat support",
      "5 savings groups",
      "Automated reminders",
    ],
  },
  {
    title: "Enterprise",
    description: "For organizations that need advanced controls and unlimited groups.",
    price: "Custom",
    highlight: "Unlimited members, advanced analytics, and priority support.",
    button: "Contact Sales",
    features: [
      "Unlimited members",
      "Advanced analytics",
      "Priority support",
      "Unlimited savings groups",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
];

export default function PricingCard() {
  return (
    <TooltipProvider>
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/" passHref>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Choose Your Plan
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Select the perfect plan for your group savings needs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {plans.map((plan) => (
              <Card
                key={plan.title}
                className="max-w-sm w-full relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col"
              >
                {/* Most Popular Badge */}
                {plan.title === "Community" && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-4 text-center">
                  <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    {plan.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-sm">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                      {plan.price}
                    </span>
                    {plan.per && (
                      <span className="text-lg text-gray-500 dark:text-gray-400">
                        {plan.per}
                      </span>
                    )}
                    {plan.price !== "Custom" && (
                      <Tooltip>
                        <TooltipTrigger
                          className="focus:outline-none ml-2"
                          aria-label={`More info about ${plan.title} plan`}
                        >
                          <CircleHelpIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 p-3 rounded-md shadow-lg">
                          <p className="text-sm">{plan.highlight}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-6 justify-center">
                  {plan.title === "Free" ? (
                    <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
                      <button
                        className="w-full max-w-xs font-semibold text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-all duration-200 rounded-lg px-4 py-2"
                        aria-label="Sign up for the Free plan"
                      >
                        {plan.button}
                      </button>
                    </SignUpButton>
                  ) : (
                    <Button
                      size="lg"
                      className="w-full max-w-xs font-semibold text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-all duration-200 rounded-lg"
                      variant={plan.title === "Enterprise" ? "outline" : "default"}
                    >
                      {plan.button}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
