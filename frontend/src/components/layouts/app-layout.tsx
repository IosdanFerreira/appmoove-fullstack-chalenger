// src/components/layouts/AppLayout.tsx

import { Header } from "../header";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
}
