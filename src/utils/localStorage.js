export const saveUser = (username) => localStorage.setItem('username', username);
export const getUser = () => localStorage.getItem('username') || '';