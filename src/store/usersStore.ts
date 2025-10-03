import { create } from 'zustand'
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: Address;
}

interface UsersStore {
  users: User[];
  isLoading: boolean;
  errorMsg: string;
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => void;
  updateUser: (id: number, updatedUser: Partial<User>) => void;
  deleteUser: (id: number) => void;
}
export interface Company {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

export interface User {
  id: number;
  name: string;
  username?: string; 
  email: string;
  phone: string;
  website?: string; 
  address: Address;
  company?: Company; 
}

const useUsersStore = create<UsersStore>((set, get) => ({
  users: [],
  isLoading: false,
  errorMsg: '',

  fetchUsers: async () => {
    set({ isLoading: true, errorMsg: '' });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const users = await response.json();
      set({ users, isLoading: false });
    } catch (error) {
      set({ 
        errorMsg: error instanceof Error ? error.message : 'An error occurred while fetching users',
        isLoading: false 
      });
    }
  },

  addUser: (user: User) => {
  const { users } = get();
  const newUser = {
    ...user,
    id: Math.max(...users.map(u => u.id), 0) + 1
  };
 
  set({ users: [newUser, ...users] }); 
},

  updateUser: (id: number, updatedUser: Partial<User>) => {
    const { users } = get();
    set({
      users: users.map(user =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    });
  },

  deleteUser: (id: number) => {
    const { users } = get();
    set({
      users: users.filter(user => user.id !== id)
    });
  }
}));

export default useUsersStore;