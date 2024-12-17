import React from 'react';
import axios from 'axios';

const EmployeeList = ({ fetchEmployees, employees, setSelectedEmployee }) => {
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/employees/delete/${id}`);
      alert('Employee deleted successfully!');
      fetchEmployees();
    } catch (error) {
      alert('Failed to delete employee');
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Employee ID</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Department</th>
          <th>Date of Joining</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.employee_id}</td>
            <td>{employee.email}</td>
            <td>{employee.phone_number}</td>
            <td>{employee.department}</td>
            <td>{employee.date_of_joining}</td>
            <td>{employee.role}</td>
            <td>
              <button onClick={() => handleEdit(employee)}>Edit</button>
              <button onClick={() => handleDelete(employee.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
