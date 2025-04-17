import React, { useState } from 'react';

function AddUserForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.email) return;
    onAdd({ id: Date.now(), ...formData });
    setFormData({ name: '', email: '', affiliation: '', role: '' });
  };

  return (
    <div>
      <h3>Add New User</h3>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input name="affiliation" placeholder="Affiliation" value={formData.affiliation} onChange={handleChange} />
      <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
      <button onClick={handleAdd}>Add User</button>
    </div>
  );
}

export default AddUserForm;