import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { Suspense } from "react";
import Loader from "./loader/Loader";
import { Toaster } from "sonner";

const FullLayout = () => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header />
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
            <Toaster richColors position="top-center" />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
