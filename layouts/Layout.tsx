import { ChildrenProps } from "@/utils/types/ComponentUtil";
import { Navbar } from "@/components/Navbar";

export default function Layout({ children, className }: ChildrenProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 min-h-screen w-full">
      <div
        className={`p-8 w-full h-full flex flex-col items-center col-start-1 md:col-start-2 md:col-span-2 lg:col-start-2 lg:col-span-8 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export { Layout };
