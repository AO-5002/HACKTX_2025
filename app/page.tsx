import { ChildrenProps } from "@/utils/types/ComponentUtil";
import { Skeleton } from "@/components/ui/skeleton";
import { MainContent, PageLayout } from "@/layouts/PageLayout";
import { Main } from "next/document";

function Box({ children }: ChildrenProps) {
  return (
    <div className="border-2 shadow-xl p-8 w-full h-96 rounded-lg">
      {children}
    </div>
  );
}

function CarOverviewBox() {
  return <Skeleton className="h-full w-full rounded-lg bg-zinc-200" />;
}

export default function Home() {
  return (
    <PageLayout>
      <MainContent
        header={
          <>
            <h1 className="text-3xl font-light">Car Overview</h1>
            <p className="text-xs text-zinc-400">
              finding the right fit for you
            </p>
          </>
        }
        mode={"full"}
      >
        <Skeleton className="h-96 w-full rounded-lg bg-zinc-200" />
      </MainContent>
    </PageLayout>
  );
}
