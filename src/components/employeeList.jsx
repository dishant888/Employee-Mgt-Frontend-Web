import React, { Component } from 'react';

const result = (props) => {
  if (props.data.loading)
    return (
      <tr>
        <td colSpan="4" align="center">
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </td>
      </tr>
    );

  if (props.data.employees.length === 0) {
    return (
      <tr>
        <td colSpan="4" align="center">
          <i>No Data Available</i>
        </td>
      </tr>
    );
  }

  return props.data.employees.map((employee, i) => {
    return (
      <tr key={employee.id}>
        <td align="center">{++i}</td>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td align="center">
          <button id={employee.id} onClick={props.onEdit} className="btn-sm border-0 rounded-0 btn-primary mr-4">Edit</button>
          <button id={employee.id} onClick={props.onDelete} className="btn-sm border-0 rounded-0 btn-danger">Delete</button>
        </td>
      </tr>
    );
  });
};

const EmployeeList = (props) => {

        return (
          <div>
            <p className="h2">Employee List</p>
            <hr />
            <table className="table-sm table-hover table-bordered w-100">
              <thead>
                <tr>
                  <td align="center">Sno.</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td align="center">Actions</td>
                </tr>
              </thead>
              <tbody>{result(props)}</tbody>
            </table>
          </div>
        );
}
 
export default EmployeeList;