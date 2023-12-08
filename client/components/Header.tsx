"use client";

import { useAppSelector, AppDispatch } from "@/redux/store";
import { Navigation } from "./Navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/features/userSlice";
import { useEffect } from "react";
import { getUser } from "@/app/api/axios/api";

const navItems = [
  { label: "My actions", href: "/" },
  { label: "Friends", href: "/friends" },
];

const Header = () => {
  const session = useSession();
  const username = useAppSelector((state) => state.userReducer.value.username);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (session.data) {
      getUser(session.data.user.id).then((data) => {
        const { id, email, username } = data;
        if (id && username && email) {
          dispatch(
            logIn({
              id: id,
              email: email,
              username: username,
            })
          );
        }
      });
    }
  }, [session.data, dispatch]);

  return (
    <>
      {session.data && (
        <header className="bg-dark fixed w-full">
          <div className="mx-auto max-w-7xl  py-6 ">
            <Navigation navLinks={navItems} username={username} />
          </div>
        </header>
      )}
    </>
  );
};

export { Header };
