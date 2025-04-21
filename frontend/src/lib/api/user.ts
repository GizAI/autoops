import apiClient from './client';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
  role?: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  password?: string;
  role?: string;
}

// Get all users (admin only)
const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Failed to get users:', error);
    throw error;
  }
};

// Get user by ID
const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get user ${id}:`, error);
    throw error;
  }
};

// Create user (admin only)
const createUser = async (userData: CreateUserData): Promise<User> => {
  try {
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

// Update user
const updateUser = async (id: number, userData: UpdateUserData): Promise<User> => {
  try {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update user ${id}:`, error);
    throw error;
  }
};

// Delete user (admin only)
const deleteUser = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/users/${id}`);
  } catch (error) {
    console.error(`Failed to delete user ${id}:`, error);
    throw error;
  }
};

export const userApi = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
