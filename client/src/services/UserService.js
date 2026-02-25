const USER_STORAGE_KEY = 'visiconnect_user';

const UserService = {
  getUser: () => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error getting user from storage:', error);
      return null;
    }
  },

  saveUser: (user) => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  },

  clearUser: () => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing user from storage:', error);
    }
  },
  
  isAuthenticated: () => {
    const user = UserService.getUser();
    return !!user;
  }
};

export default UserService;
