"use client";

import { addFriend, findUsers } from "@/app/api/axios/api";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { UserAddIcon, EyeIcon } from "@heroicons/react/solid";
import { fetchFriends } from "@/redux/features/friendsSlice";

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    { id: string; username: string }[]
  >([]);
  const userId = useAppSelector((state) => state.userReducer.value.id);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (searchTerm) {
      findUsers(userId, searchTerm).then((data) => {
        setSearchResults(data);
      });
    }
  }, [searchTerm]);
  const router = useRouter();
  const handleAddFriend = (friendId: string) => {
    addFriend({ userId, friendId }).then(() => {
      dispatch(fetchFriends(userId));
      setSearchTerm("");
    });
  };

  return (
    <div className="flex-1 ">
      <h2 className="text-2xl font-bold mb-8">Find new friend</h2>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-dark rounded focus:outline-none mb-2"
      />
      {searchResults.length === 0 && searchTerm.length > 0 && (
        <p>No matching users found.</p>
      )}
      {searchTerm && (
        <ul>
          {searchResults.map((friend) => (
            <li
              key={friend.id}
              className="flex justify-between bg-gray items-center p-2 border border-dark"
            >
              <span>{friend.username}</span>
              <div className="space-x-2 flex items-center">
                <button
                  onClick={() => handleAddFriend(friend.id)}
                  className="text-red-500"
                >
                  <UserAddIcon className="h-5 w-5 text-dark" />
                </button>
                <button
                  onClick={() => router.push(`friends/${friend.id}`)}
                  className="text-red-500"
                >
                  <EyeIcon className="h-5 w-5 text-dark" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { SearchUser };
