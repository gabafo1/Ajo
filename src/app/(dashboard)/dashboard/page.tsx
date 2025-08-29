import { MetricCards, type Metric } from "@/app/(dashboard)/components/Metric-card";
import { Users, DollarSign, CreditCard, Activity } from "lucide-react";
import { UsersTable } from "@/app/(dashboard)/components/UsersTable";
import { AdBanner } from "@/app/(dashboard)/components/Ad-Banner";
import { QuickLinks } from "@/app/(dashboard)/components/Quick-Links";
import { ChartPie } from "../components/Chart-Pie";
import { ChartLine } from "../components/Chart-Line";
import { 
  getSubscriptionsCount, 
  getSubscriptionsBreakDown, 
  getActiveSubsByPlanPerMonth, 
  getUserCount, 
  getUserList } from "@/app/(dashboard)/admin/actions";




/*const users: User[] =[
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    lastSignInAt: 1708423800000,
    emailAddresses: [
      {
        id: 101,
        emailAddress: "john.doe@example.com",
      },

    ]
  },
  {
    id: 2,
    firstName: "Alice",
    lastName: "Smith",
    lastSignInAt: 1708356300000,
    emailAddresses: [
      {
        id: 201,
        emailAddress: "alice.smith@example.com",
      },
      {
        id: 202,
        emailAddress: "alice.personal@example.com",
      },

    ]
  },
  {
    id: 3,
    lastName: "Johnson",
    lastSignInAt: 1708246500000,
    emailAddresses: [
      {
        id: 301,
        emailAddress: "johnson@example.com",
      },

    ]
  },
  {
    id: 4,
    firstName: "Maria",
    lastName: "Garcia",
    lastSignInAt: 1708416000000,
    emailAddresses: [
      {
        id: 401,
        emailAddress: "maria.garcia@example.com",
      },

    ]
  },
  {
    id: 5,
    firstName: "David",
    lastSignInAt: 1708184400000,
    emailAddresses: [
      {
        id: 501,
        emailAddress: "david@example.com",
      },

    ]
  },
]*/


export default async function Dashboard() {
  const subscriptions = await getSubscriptionsCount();
  const subBreakDown = await getSubscriptionsBreakDown();
  const subPerMonth = await getActiveSubsByPlanPerMonth();
  const userCount = await getUserCount()
  const userClerk = await getUserList()

  const metrics: Metric[] = [
    {
      title: "Users",
      value: userCount,
      change:"+60% from last month",
      icon: <Users className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Subscriptions",
      value: String(subscriptions),
      change:"+100% from last month",
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Revenue",
      value: "$200",
      change:"+200% from last month",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Last Month Subcription",
      value: "500",
      change:"+60% from last month",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />
    },
  ]

  return (
        <div className="container mx-auto p-4 space-y-4">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <MetricCards metrics={metrics} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <ChartLine data={subPerMonth} />
            </div>
            <div className=" flex flex-col space-y-4">
              <AdBanner />
              <QuickLinks />
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 lg:col-span-2">
              <div className=" bg-card rounded-lg p-6 shadow-sm">
                <h2 className=" text-xl font-bold m-4">Recent Users</h2>
                <UsersTable data={userClerk?.data ?? []} />
              </div>
            </div>
            <ChartPie data={subBreakDown}/>
          </div>
        </div>
  )
}
