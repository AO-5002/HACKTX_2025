import { ChildrenProps } from "@/utils/types/ComponentUtil";

export default function RegistryLayout({ children, className }: ChildrenProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 min-h-screen w-full">
      <div
        className={`p-8 w-full h-full flex justify-center items-center gap-8 col-start-1 md:col-start-2 md:col-span-2 lg:col-start-3 lg:col-span-6 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export { RegistryLayout };
