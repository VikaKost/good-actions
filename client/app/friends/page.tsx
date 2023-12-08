import { FriendsList } from "@/components/FriendsList";
import { SearchUser } from "@/components/SearchUser";

export default async function Friends() {
  return (
    <div className="stack flex h-full max-w-7xl mx-auto space-x-4">
      <FriendsList />
      <SearchUser />
    </div>
  );
}
