import React, { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import { fetchEmployees } from './api';
import './styles.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const getEmployees = async () => {
    const { data } = await fetchEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <h1>Employee Management</h1>
      <EmployeeForm
        fetchEmployees={getEmployees}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />
      <EmployeeList
        fetchEmployees={getEmployees}
        employees={employees}
        setSelectedEmployee={setSelectedEmployee}
      />
    </div>
  );
};

export default App;
