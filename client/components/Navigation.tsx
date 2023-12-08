"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import { CogIcon, UserIcon } from "@heroicons/react/solid";
import { UserModal } from "./UserModal";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { show } from "@/redux/features/modalSlice";
import { Props } from "@/types/types";

const Navigation = ({ navLinks, username }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between">
      <div className="space-x-4 flex">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`text-lg ${isActive ? "font-bold" : ""} text-gray`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
      <div className="space-x-4 flex items-center">
        <div className="user-block flex bg-gray px-4 py-2 rounded-sm space-x-4 ">
          <h3 className="flex items-center space-x-2 font-bold">
            <UserIcon className="h-5 w-5 text-dark mr-1" /> {username}
          </h3>
          <button onClick={() => dispatch(show())}>
            <CogIcon className="h-5 w-5 text-dark " />
          </button>
        </div>
        <UserModal />
        <Link href="#" onClick={() => signOut({ callbackUrl: "/signin" })}>
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export { Navigation };
