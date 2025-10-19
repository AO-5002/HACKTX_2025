import { Skeleton } from "@/components/ui/skeleton";
import { ChildrenProps } from "@/utils/types/ComponentUtil";
import { Car, Heart, TrendingUp, DollarSign } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Clock } from "lucide-react";

/* --------------------------------------------------- */
/* Component Layout                                    */
/* --------------------------------------------------- */
function ComponentLayout({ children, className }: ChildrenProps) {
  return (
    <div
      className={`border shadow-md p-4 flex flex-col gap-2 rounded-lg bg-white ${className}`}
    >
      {children}
    </div>
  );
}

/* --------------------------------------------------- */
/* Car Box                                             */
/* --------------------------------------------------- */
function CarBox() {
  return (
    <div className="flex flex-col items-start gap-4 min-w-[180px] min-h-[340px] bg-zinc-100 p-4 rounded-lg shadow-md">
      <h1 className="text-sm font-semibold">Toyota RV-4</h1>
      <Skeleton className="w-full h-[200px]" />
      <p className="text-xs text-zinc-500">Hybrid • AWD • 2015 Model</p>
    </div>
  );
}

/* --------------------------------------------------- */
/* Payment Component                                   */
/* --------------------------------------------------- */
interface PaymentComponentProps {
  dueDate: string;
  remainingAmount: string;
  isPaid?: boolean;
}

function PaymentComponent({
  dueDate,
  remainingAmount,
  isPaid = false,
}: PaymentComponentProps) {
  return (
    <div
      className={`w-full h-24 p-3 shadow-sm rounded-lg flex items-center justify-between transition ${
        isPaid
          ? "bg-green-50 hover:bg-green-100"
          : "bg-zinc-100 hover:bg-zinc-200"
      }`}
    >
      {/* Left side: Checkbox and info */}
      <div className="flex items-center gap-3">
        <Checkbox
          id={`payment-${dueDate}`}
          defaultChecked={isPaid}
          className="border-zinc-400"
        />
        <div className="flex flex-col leading-tight">
          <h1 className="text-sm font-medium text-zinc-800">
            Next Payment Due{" "}
            <span className="font-semibold text-black">{dueDate}</span>
          </h1>
          <p className="text-xs text-zinc-500">
            You are{" "}
            <span
              className={`font-semibold ${
                isPaid ? "text-green-600" : "text-red-500"
              }`}
            >
              {remainingAmount}
            </span>{" "}
            away from your target!
          </p>
        </div>
      </div>

      {/* Right side: Icon */}
      {isPaid ? (
        <CheckCircle className="h-4 w-4 text-green-600 opacity-80" />
      ) : (
        <Clock className="h-4 w-4 text-yellow-500 opacity-80" />
      )}
    </div>
  );
}

/* --------------------------------------------------- */
/* Dashboard Analytics Static Components               */
/* --------------------------------------------------- */
function DashboardAnalyticsStaticComponents() {
  return (
    <div className="grid grid-cols-[540px_1fr] grid-rows-[1fr_200px] gap-4 w-full h-full">
      {/* ---------- Row 1 Col 1 ---------- */}
      <ComponentLayout className="col-start-1 row-start-1">
        <h1 className="text-xl font-semibold">Recent Searches</h1>
        <p className="text-xs text-zinc-400 -mt-2">
          Pick up where you left off...
        </p>
        <div className="flex flex-row gap-4 mt-4 justify-between overflow-x-auto">
          <CarBox />
          <CarBox />
          <CarBox />
        </div>
      </ComponentLayout>

      {/* ---------- Row 1 Col 2 ---------- */}
      <ComponentLayout className="col-start-2 row-start-1">
        <h1 className="text-xl font-semibold">Upcoming Payments</h1>
        <div className="flex flex-col items-center gap-2 w-full h-full mt-2">
          <PaymentComponent dueDate="01/10/2025" remainingAmount="$6k" />
          <PaymentComponent dueDate="02/15/2025" remainingAmount="$3.2k" />
          <PaymentComponent dueDate="03/10/2025" remainingAmount="$0" isPaid />
        </div>
      </ComponentLayout>

      {/* ---------- Row 2 Col 1 ---------- */}
      <ComponentLayout className="col-start-1 row-start-2">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Performance Overview
        </h1>
        <p className="text-sm text-zinc-500 -mt-1">
          Simple analytics for your account activity
        </p>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col bg-zinc-100 rounded-lg p-3 text-center">
            <p className="text-xs text-zinc-500">Total Revenue</p>
            <h2 className="text-lg font-semibold text-zinc-800">$24,500</h2>
          </div>
          <div className="flex flex-col bg-zinc-100 rounded-lg p-3 text-center">
            <p className="text-xs text-zinc-500">Active Users</p>
            <h2 className="text-lg font-semibold text-zinc-800">1,245</h2>
          </div>
          <div className="flex flex-col bg-zinc-100 rounded-lg p-3 text-center">
            <p className="text-xs text-zinc-500">Cars Sold</p>
            <h2 className="text-lg font-semibold text-zinc-800">18</h2>
          </div>
        </div>
      </ComponentLayout>

      {/* ---------- Row 2 Col 2 ---------- */}
      <ComponentLayout className="col-start-2 row-start-2">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Wishlist
        </h1>
        <p className="text-sm text-zinc-500 -mt-1">
          Cars you’ve marked as favorites
        </p>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-zinc-100 rounded-lg p-3 text-center">
            <p className="text-sm font-medium text-zinc-800">Honda CR-V</p>
            <p className="text-xs text-zinc-500">2020 Model</p>
          </div>
          <div className="bg-zinc-100 rounded-lg p-3 text-center">
            <p className="text-sm font-medium text-zinc-800">Mazda CX-5</p>
            <p className="text-xs text-zinc-500">2019 Model</p>
          </div>
          <div className="bg-zinc-100 rounded-lg p-3 text-center">
            <p className="text-sm font-medium text-zinc-800">Subaru Forester</p>
            <p className="text-xs text-zinc-500">2021 Model</p>
          </div>
        </div>
      </ComponentLayout>
    </div>
  );
}

export { DashboardAnalyticsStaticComponents };
