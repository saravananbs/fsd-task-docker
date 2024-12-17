import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ fetchEmployees, selectedEmployee, setSelectedEmployee }) => {
  const [formData, setFormData] = useState({
    name: '',
    employee_id: '',
    email: '',
    phone_number: '',
    department: '',
    date_of_joining: '',
    role: '',
  });

  const [errors, setErrors] = useState('');
  const [feedback, setFeedback] = useState('');

  // Prepopulate form for editing
  useEffect(() => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
    }
  }, [selectedEmployee]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.employee_id.trim()) newErrors.employee_id = 'Employee ID is required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!phoneRegex.test(formData.phone_number)) newErrors.phone_number = 'Phone number must be 10 digits';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.date_of_joining) newErrors.date_of_joining = 'Date of joining is required';
    else if (new Date(formData.date_of_joining) > new Date()) newErrors.date_of_joining = 'Date cannot be in the future';
    if (!formData.role.trim()) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (selectedEmployee) {
        await axios.put(`http://localhost:5000/api/employees/update/${selectedEmployee.id}`, formData);
        setFeedback('Employee updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/employees/add', formData);
        setFeedback('Employee added successfully!');
      }
      setFormData({
        name: '',
        employee_id: '',
        email: '',
        phone_number: '',
        department: '',
        date_of_joining: '',
        role: '',
      });
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      setFeedback(error.response?.data?.error || 'Failed to submit the form');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      employee_id: '',
      email: '',
      phone_number: '',
      department: '',
      date_of_joining: '',
      role: '',
    });
    setSelectedEmployee(null);
    setErrors({});
    setFeedback('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {feedback && <p>{feedback}</p>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          disabled={!!selectedEmployee}
        />
        {errors.employee_id && <span className="error">{errors.employee_id}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        {errors.phone_number && <span className="error">{errors.phone_number}</span>}
      </div>
      <div>
        <label>Department:</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>
        {errors.department && <span className="error">{errors.department}</span>}
      </div>
      <div>
        <label>Date of Joining:</label>
        <input
          type="date"
          name="date_of_joining"
          value={formData.date_of_joining}
          onChange={handleChange}
        />
        {errors.date_of_joining && <span className="error">{errors.date_of_joining}</span>}
      </div>
      <div>
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
        {errors.role && <span className="error">{errors.role}</span>}
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
};

export default EmployeeForm;
