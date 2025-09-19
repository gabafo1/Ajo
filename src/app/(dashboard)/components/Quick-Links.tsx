<<<<<<< HEAD
import Link from "next/link"

import{
    Card,
    CardContent,
} from "@/components/ui/card"

type Link ={
    href: string,
    text: string
}

const links: Link[] =[
    {
        href: "/support",
        text: "How can users contact support"
    },
    {
        href: "/faq",
        text: "Frequently asked questions about dashboard"
    },
    {
        href: "/pricing",
        text: "How to host the app?"
    },
    {
        href: "/features",
        text: "3 ways you can share results"
    },
    {
        href: "/about",
        text: "How to integrate AI to analyse feedback"
    },
    {
        href: "/contact",
        text: "Contact Us"
    },
    {
        href: "/terms",
        text: "Terms and Conditions"
    },
    {
        href: "/privacy",
        text: "Privacy Policy"
    },
]


export function QuickLinks() {
  return (
    <Card className=" bg-slate-200 border-none overflow-hidden">
        <CardContent className="p-6 h-full flex flex-col">
            <h2 className="text-md md:text-lg font-bold mb-2">Quick Links</h2>
            <ul>
                {
                    links.map((link,index) =>(
                        <li key={index} className="mb-2 hover:underline md:text-normal text-sm">
                            <Link href={link.href}>
                                {link.text}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </CardContent>
    </Card>
  )
=======
import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type QuickLink = {
  href: string;
  text: string;
};

const links: QuickLink[] = [
  {
    href: "/support",
    text: "How can members contact support?",
  },
  {
    href: "/faq",
    text: "Frequently asked questions about Ajo/Esusu",
  },
  {
    href: "/pricing",
    text: "How much does it cost to run a group?",
  },
  {
    href: "/features",
    text: "3 ways to track and share group results",
  },
  {
    href: "/about",
    text: "How AI can help analyse group contributions",
  },
  {
    href: "/contact",
    text: "Contact Us",
  },
  {
    href: "/terms",
    text: "Terms and Conditions",
  },
  {
    href: "/privacy",
    text: "Privacy Policy",
  },
];

export function QuickLinks() {
  return (
    <Card className="bg-slate-200 border-none overflow-hidden">
      <CardContent className="p-6 h-full flex flex-col">
        <h2 className="text-md md:text-lg font-bold mb-2">Quick Links</h2>
        <ul>
          {links.map((link, index) => (
            <li
              key={index}
              className="mb-2 hover:underline md:text-normal text-sm"
            >
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
>>>>>>> 978af04 (Initial commit)
}
