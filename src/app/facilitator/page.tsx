import React from "react";
import { AdminPortalGate } from "@/components/admin/AdminPortalGate";

export const metadata = {
  title: "Facilitator & Admin Console",
  description: "Restricted facilitator workbench and live session delivery controls.",
};

export default function FacilitatorPage() {
  return <AdminPortalGate initialTab="facilitator" />;
}
