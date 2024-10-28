import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MemberSidebar from '../components/Members/MemberSidebar';
import MemberHeader from '../components/Members/MemberHeader';

export default function MemberLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="bg-whiten dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <MemberSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <MemberHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className="bg-whiten w-full h-full">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 min-h-[calc(100vh-80px)]">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
}
