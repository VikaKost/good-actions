"use client";

import { ActionList } from "@/components/ActionList";
import { usePathname } from "next/navigation";

export default function ExampleClientComponent() {
  const pathname = usePathname();
  let path = pathname.match(/\/friends\/(\w+)/);

  return <ActionList user={path ? path[1] : undefined} />;
}
