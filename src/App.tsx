import { Route, Routes } from "react-router-dom";
import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import CreateRelease from "@/pages/CreateRelease";
import EditRelease from "@/pages/EditRelease";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 md:px-6">
        <Sidebar />
        <main className="min-w-0 flex-1 pb-16">
          <Routes>
            <Route path="/releases/new" element={<CreateRelease />} />
            <Route path="/releases/:id/edit" element={<EditRelease />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}