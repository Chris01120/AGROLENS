import { Sidebar } from "./Sidebar";
import { LivePanel } from "./LivePanel";
import { MobileNav } from "./MobileNav";
import { MobileHeader } from "./MobileHeader";
export function AppShell({ children, hideRightPanel = false, }) {
    return (<div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="relative flex min-w-0 flex-1 flex-col">
        <MobileHeader />
        <div className="flex-1 pb-28 lg:pb-10">{children}</div>
        <MobileNav />
      </main>
      {!hideRightPanel && <LivePanel />}
    </div>);
}
