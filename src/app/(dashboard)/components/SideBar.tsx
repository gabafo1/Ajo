"use client";

import { useUser } from "@clerk/nextjs";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../../components/ui/sidebar";
<<<<<<< HEAD
import { GitPullRequestArrow, Home, Settings, User } from "lucide-react";
=======
import {  Home, Receipt, SearchIcon, User } from "lucide-react";
>>>>>>> 978af04 (Initial commit)
import Link from "next/link";
import { usePathname } from "next/navigation";



export function AppSideBar(){
    const pathname = usePathname(); 
    const {user} = useUser(); 
    const metadata = user?.publicMetadata  
    const role =  metadata?.role

    const sideBarItems:{
        name: string;
        href: string;
        icon: React.ReactNode;
    }[] = [
        { name: "Dashboard", href: "/dashboard", icon: <Home /> },
        ...(role && role === "admin" ?[ 
            { name: "Users", href: "/admin/users", icon: <User /> },
        ] :[]),
<<<<<<< HEAD
        { name: "Support", href: "/requests", icon: <GitPullRequestArrow /> },
        { name: "Settings", href: "/settings", icon: <Settings /> }
    ]

    return(
        <Sidebar side= "left">
=======
        { name: "Transactions", href: "/transactions", icon: <Receipt /> },
        { name: "Reports", href: "/reports", icon: <SearchIcon /> }
    ]

    return(
        <Sidebar collapsible="icon" side= "left">
>>>>>>> 978af04 (Initial commit)
            <SidebarHeader>
                <h1 className="text-2xl font-bold text-primary"> Admin Portal</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {sideBarItems.map((item, index) =>(
                        <SidebarMenuItem key={index}>
                            <Link href={item.href}>
                                <SidebarMenuButton isActive={ pathname === item.href }>
                                    {item.icon}
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}