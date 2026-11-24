import React from "react";
import { AdminPortalGate } from "@/components/admin/AdminPortalGate";

export const metadata = {
  title: "Admin & Staff Portal",
  description: "Restricted staff portal for curriculum pacing, facilitator console, and classroom management.",
};

export default function AdminPage() {
  return <AdminPortalGate initialTab="facilitator" />;
}
