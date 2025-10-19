"use client";

import Layout from "./Layout";
import { ChildrenProps } from "@/utils/types/ComponentUtil";
import { Search, TextAlignJustify } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import ToyotaIcon from "@/components/ToyotaIcon";

/* --------------------------------------------------- */
/* Search Bar                                           */
/* --------------------------------------------------- */
function SearchBar() {
  return (
    <div className="flex items-center flex-row-reverse bg-zinc-100 w-[500px] rounded-md p-2 gap-4">
      <Search height={16} width={16} />
      <input
        type="text"
        placeholder="Hinted Search Text..."
        className="outline-none border-none text-xs w-full bg-transparent"
      />
      <TextAlignJustify height={16} width={16} />
    </div>
  );
}

/* --------------------------------------------------- */
/* Props Interfaces                                    */
/* --------------------------------------------------- */
interface MainContentProps extends ChildrenProps {
  header?: React.ReactNode;
  mode?: "btm" | "full";
  rightPanel?: boolean;
}

interface BottomPanelProps extends ChildrenProps {
  header?: React.ReactNode;
}

/* --------------------------------------------------- */
/* Left Panel                                          */
/* --------------------------------------------------- */
function LeftPanel() {
  return (
    <div className="col-start-1 row-span-2 h-full flex flex-col items-end justify-between py-8 -mr-4">
      <Navbar />
    </div>
  );
}

/* --------------------------------------------------- */
/* Right Panel                                         */
/* --------------------------------------------------- */
function RightPanel({ children }: ChildrenProps) {
  return (
    <div className="col-start-6 row-start-1 row-span-1 h-full  p-4">
      {children}
    </div>
  );
}

/* --------------------------------------------------- */
/* Main Content (with header + body)                   */
/* --------------------------------------------------- */
function MainContent({ children, header, rightPanel }: MainContentProps) {
  return (
    <div
      className={`col-start-2 ${
        rightPanel ? "col-span-4" : "col-span-5"
      } row-start-1 h-full grid grid-rows-[auto_1fr] gap-6 p-4`}
    >
      {/* Header Row */}
      <div className="flex justify-between items-start ">
        <div className="flex flex-row gap-4 items-center">
          <ToyotaIcon />
          <div className="flex flex-col">{header ?? null}</div>
        </div>

        <SearchBar />
      </div>

      {/* Main Content */}
      <div className="w-full h-full overflow-hidden">{children}</div>
    </div>
  );
}

/* --------------------------------------------------- */
/* Bottom Panel                                        */
/* --------------------------------------------------- */
function BottomPanel({ children, header }: BottomPanelProps) {
  return (
    <div className="col-start-2 col-span-5 row-start-2 p-4 flex flex-col gap-4">
      <h1 className="text-black text-base font-medium">{header ?? ""}</h1>
      <div className="flex flex-row items-center justify-between gap-8">
        {children}
      </div>
    </div>
  );
}

/* --------------------------------------------------- */
/* Page Layout                                         */
/* --------------------------------------------------- */
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <div className="h-full w-full grid grid-cols-6 grid-rows-[1fr_auto] gap-8">
        {/* Sidebar */}
        <LeftPanel />

        {/* Main + Bottom content */}
        {children}
      </div>
    </Layout>
  );
}

export { PageLayout, MainContent, RightPanel, BottomPanel };
