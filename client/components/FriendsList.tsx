"use client";

import { deleteFriend } from "@/app/api/axios/api";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { EyeIcon, TrashIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchFriends } from "@/redux/features/friendsSlice";

const FriendsList = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const dataFriends: { id: string; username: string }[] = useAppSelector(
    (state) => state.friendReducer
  );

  const userId = useAppSelector((state) => state.userReducer.value.id);
  useEffect(() => {
    dispatch(fetchFriends(userId));
  }, [userId]);

  const handleRemoveFriend = (friendId: string) => {
    deleteFriend({ userId, friendId }).then(() => {
      dispatch(fetchFriends(userId));
    });
  };
  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold mb-8">My friends</h2>
      <ul>
        {dataFriends.map((friend) => (
          <li
            key={friend.id}
            className="flex justify-between bg-gray items-center p-2 border border-dark"
          >
            <span>{friend.username}</span>
            <div className="space-x-2 flex items-center">
              <button onClick={() => handleRemoveFriend(friend.id)}>
                <TrashIcon className="h-5 w-5 text-red" />
              </button>
              <button onClick={() => router.push(`friends/${friend.id}`)}>
                <EyeIcon className="h-5 w-5 text-dark" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { FriendsList };
