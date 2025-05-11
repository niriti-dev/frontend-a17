import api from '../auth/axiosInstance';

// READ all users
export const fetchUsers = async () => {
  try {
    const response = await api.get('/people');
    // Convert the return object into an array of users
    const usersArray = Object.values(response.data.return).map(p => ({
      ...p,
      roles: p.roles || [], 
      id: p._id 
    }));
    return usersArray;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// READ single user
export async function getUser(id) {
  const res = await api.get(`/people/${encodeURIComponent(id)}`);
  return {
    ...res.data,
    roles: Array.isArray(res.data.roles) ? res.data.roles : res.data.roles.split(', ')
  };
}

// CREATE user
export async function createUser(userData) {
  const res = await api.post('/people/create', {
    ...userData,
    roles: Array.isArray(userData.roles) ? userData.roles : userData.roles.split(', ')
  });
  return res.data.person;
}

// UPDATE user
export async function updateUser(id, payload) {
  // Send the entire payload for a complete document replacement
  const res = await api.put(`/people/${id}`, payload);
  return res.data;
}

// DELETE user
export async function deleteUser(id) {
  const res = await api.delete(`/people/${encodeURIComponent(id)}`);
  return res.data;
}
