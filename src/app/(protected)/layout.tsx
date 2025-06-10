import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-5">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
      {children}
    </div>
  );
};

export default ProtectedLayout;
