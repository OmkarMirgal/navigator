import React from "react";
import { UserSettings } from "./user-settings";
import { getSession } from "@/lib/auth";

const Header = async () => {
  const session = await getSession();
  const userId = await session.user.id;
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">🧭 Navigator</h1>
      <div className="flex ml-auto align-middle">
        <UserSettings userId={Number(userId)} />
      </div>
    </header>
  );
};

export default Header;
