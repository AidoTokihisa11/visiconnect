const USER_STORAGE_KEY = 'visiconnect_user';

const readUserFromStorage = () => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

const UserService = {
  getUser: readUserFromStorage,

  saveUser: (user) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  clearUser: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  isAuthenticated: () => Boolean(readUserFromStorage()),
};

export default UserService;
