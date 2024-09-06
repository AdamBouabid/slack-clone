"use client";

import { UserButton } from "@/features/auth/components/user-button";

export default function Home() {
  return (
    <div className="h-full">
      Logged In <UserButton>Sign Out</UserButton>
    </div>
  );
}
