import { instance } from "./index";
import { ActionDetails, UserDetails } from "@/types/types";

export async function login(values: {
  email: string;
  password: string;
}): Promise<UserDetails> {
  try {
    const response = await instance.post(`/auth/login/`, values);
    return response.data;
  } catch (error) {
    console.error("SignIn error:", error);
    throw error;
  }
}

export async function register(values: {
  username: string;
  email: string;
  password: string;
}): Promise<UserDetails> {
  try {
    const response = await instance.post(`/auth/register/`, values);
    return response.data;
  } catch (error) {
    console.error("SignUp error:", error);
    throw error;
  }
}

export async function editUser(values: {
  id: string;
  email: string | null;
  username: string | null;
}): Promise<{ id: string; username: string; email: string }> {
  try {
    const response = await instance.patch(`/user/${values.id}`, values);
    return response.data;
  } catch (error) {
    console.error("Edit user error:", error);
    throw error;
  }
}

export async function getUser(userId: string): Promise<UserDetails> {
  try {
    const response = await instance.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
}

export async function deleteUser(userId: string): Promise<string> {
  try {
    const response = await instance.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("delete user error:", error);
    throw error;
  }
}

export async function findUsers(
  userId: string,
  term: string
): Promise<UserDetails[]> {
  try {
    const response = await instance.get(`/friend`, {
      params: {
        userId,
        term,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Find users error:", error);
    throw error;
  }
}

export async function addFriend(values: {
  userId: string;
  friendId: string;
}): Promise<string> {
  try {
    const response = await instance.post(`/friend/`, values);
    return response.data;
  } catch (error) {
    console.error("Add friend error:", error);
    throw error;
  }
}

export async function getFriends(userId: string): Promise<UserDetails[]> {
  try {
    const response = await instance.get(`/friend/${userId}`);
    console.log(userId);
    return response.data;
  } catch (error) {
    console.error("Get griend error:", error);
    throw error;
  }
}

export async function deleteFriend(values: {
  userId: string;
  friendId: string;
}): Promise<string> {
  try {
    const response = await instance.delete(`/friend/${values.userId}`, {
      params: {
        friendId: values.friendId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Delete friend error:", error);
    throw error;
  }
}

export async function addAction(values: {
  text: string;
  user: string;
}): Promise<ActionDetails> {
  try {
    const response = await instance.post(`/action/`, values);
    return response.data;
  } catch (error) {
    console.error("Creating action error:", error);
    throw error;
  }
}

export async function editAction(values: {
  id: string;
  text: string;
}): Promise<ActionDetails> {
  try {
    const response = await instance.patch(`/action/${values.id}`, values);
    return response.data;
  } catch (error) {
    console.error("Editing action error:", error);
    throw error;
  }
}

export async function deleteAction(values: {
  id: string;
}): Promise<ActionDetails> {
  try {
    const response = await instance.delete(`/action/${values.id}`);
    return response.data;
  } catch (error) {
    console.error("Deleting action error:", error);
    throw error;
  }
}

export async function getActions(userId: string): Promise<ActionDetails[]> {
  try {
    console.log(userId);
    const response = await instance.get(`/action`, {
      params: {
        userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Get actions error:", error);
    throw error;
  }
}
