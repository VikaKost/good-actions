"use client";

import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import {
  addAction,
  deleteAction,
  editAction,
  getActions,
  getUser,
} from "@/app/api/axios/api";
import { useAppSelector } from "@/redux/store";
import { Action } from "@/types/types";

interface ActionListProps {
  user?: string;
}

const ActionList: React.FC<ActionListProps> = ({ user }) => {
  const [tasks, setTasks] = useState<Action[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [username, setUsername] = useState("");

  const userId = useAppSelector((state) => state.userReducer.value.id);

  useEffect(() => {
    userId && updateActions();
  }, [userId]);

  const updateActions = () => {
    const userID = user ? user : userId;
    getActions(userID).then((data) => {
      const actions: Action[] = data.map((item) => ({
        id: item._id,
        text: item.text,
      }));
      console.log(actions);
      setTasks(actions);
      user && getUsername();
    });
  };

  const getUsername = async () => {
    if (user) {
      const data = await getUser(user);
      setUsername(data.username);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      addAction({
        text: newTask,
        user: userId,
      }).then(() => {
        updateActions();
      });
      setNewTask("");
    }
  };

  const startEditing = (id: string, text: string) => {
    setEditingTask(id);
    setEditedText(text);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditedText("");
  };

  const applyEditing = (id: string) => {
    editAction({
      id: id,
      text: editedText,
    }).then(() => {
      updateActions();
    });

    setEditingTask(null);
    setEditedText("");
  };

  const deleteTask = (id: string) => {
    deleteAction({ id }).then(() => {
      updateActions();
    });
  };

  return (
    <div className="mx-auto inline text-center">
      {user ? (
        <div className="">
          <h2 className="text-2xl font-bold mb-8">
            Good actions by {username}
          </h2>
          <ul className="mx-auto flex flex-col w-1/2 space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between bg-gray items-center p-2 border border-dark"
              >
                <span className="mr-2">{task.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="">
          <div className="mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && addTask()}
              className="w-1/2 p-2 border border-dark rounded focus:outline-none"
              placeholder="Add new action"
            />
          </div>
          <ul className="mx-auto flex flex-col w-1/2 space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between bg-gray items-center p-2 border border-dark"
              >
                {editingTask === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="p-2 order border-dark rounded focus:outline-none  mr-2"
                    />
                    <div className="">
                      <button
                        onClick={() => applyEditing(task.id)}
                        className="p-2 bg-green-500 text-black rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-2 bg-gray-500 text-black rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="mr-2">{task.text}</span>
                    <div className="">
                      <button
                        onClick={() => startEditing(task.id, task.text)}
                        className="p-2 bg-blue-500 text-dark rounded mr-2"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 bg-red-500 text-red rounded"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { ActionList };
