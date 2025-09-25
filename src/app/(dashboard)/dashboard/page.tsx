import { MetricCards, type Metric } from "@/app/(dashboard)/components/Metric-card";
import { Users, CreditCard, Activity, Coins } from "lucide-react";
import { UsersTable } from "@/app/(dashboard)/components/UsersTable";
import { AdBanner } from "@/app/(dashboard)/components/Ad-Banner";
import { QuickLinks } from "@/app/(dashboard)/components/Quick-Links";
import { ChartPie } from "../components/Chart-Pie";
import { ChartLine } from "../components/Chart-Line";
import { 
  getSubscriptionsCount as getContributionsCount, 
  getSubscriptionsBreakDown as getContributionBreakDown, 
  getActiveSubsByPlanPerMonth as getActiveCyclesPerMonth, 
  getUserCount, 
  getUserList 
} from "@/app/(dashboard)/admin/actions";
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/db";
import { kyc } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Dashboard() {
  const contributions = await getContributionsCount();
  const contribBreakDown = await getContributionBreakDown();
  const cyclesPerMonth = await getActiveCyclesPerMonth();
  const userCount = await getUserCount();
  const userClerk = await getUserList();

  const user = await currentUser();

  let needsKyc = false;
  let groupName: string | null = null;

  if (user?.id) {
    // check if user has KYC in Neon DB
    const existingKyc = await db
      .select()
      .from(kyc)
      .where(eq(kyc.userId, user.id));

    if (existingKyc.length > 0) {
      groupName = existingKyc[0].groupName;
    } else {
      needsKyc = true;
    }
  }

  const metrics: Metric[] = [
    {
      title: "Members",
      value: userCount,
      change:"+60% from last cycle",
      icon: <Users className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Total Contributions",
      value: String(contributions),
      change:"+100% from last cycle",
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Group Payouts",
      value: "₦200,000",
      change:"+200% from last cycle",
      icon: <Coins className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Last Cycle Contributions",
      value: "500",
      change:"+60% from last cycle",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />
    },
  ]

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard {groupName ? `- ${groupName}` : ""}
      </h1>
      <MetricCards metrics={metrics} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <ChartLine data={cyclesPerMonth} />
        </div>
        <div className="flex flex-col space-y-4">
          <AdBanner />
          <QuickLinks />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold m-4">Recent Members</h2>
            <UsersTable data={userClerk?.data ?? []} />
          </div>
        </div>
        <ChartPie data={contribBreakDown} />
      </div>
    </div>
  )
}
