const isBrowser = typeof window !== "undefined";

export const saveTasks = (tasks) => {
  if (isBrowser) {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }
};

export const getTasks = () => {
  if (isBrowser) {
    try {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load tasks:", error);
      return [];
    }
  }
  return [];
};

export const saveUser = (username) => {
  if (isBrowser) {
    try {
      localStorage.setItem("username", username);
    } catch (error) {
      console.error("Failed to save username:", error);
    }
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem("username") || "";
    } catch (error) {
      console.error("Failed to get username:", error);
      return "";
    }
  }
  return "";
};

export const removeUser = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("username");
    } catch (error) {
      console.error("Failed to remove username:", error);
    }
  }
};
