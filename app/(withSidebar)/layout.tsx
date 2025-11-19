import { Sidebar } from "@/components/sidebar";

export default function WithSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-1 md:ml-72">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </div>
    </div>
  );
}
