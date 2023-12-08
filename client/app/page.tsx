import { ActionList } from "@/components/ActionList";

export default function Home() {
  return (
    <div className="max-w-7 mx-auto p-2">
      <h1 className="text-2xl font-bold mb-8 text-center">My good actions</h1>
      <ActionList />
    </div>
  );
}
