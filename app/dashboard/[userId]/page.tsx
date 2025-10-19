import React from "react";
import { BottomPanel, MainContent, PageLayout } from "@/layouts/PageLayout";
import { DashboardAnalyticsStaticComponents } from "./static-components";

function Dashboard() {
  return (
    <PageLayout>
      <MainContent
        mode="full"
        rightPanel={false}
        header={
          <>
            <h1 className="text-2xl font-light">Welcome</h1>
            <p className="text-xs text-zinc-400">
              What would you like to do today?
            </p>
          </>
        }
      >
        <DashboardAnalyticsStaticComponents />
      </MainContent>
    </PageLayout>
  );
}

export default Dashboard;
