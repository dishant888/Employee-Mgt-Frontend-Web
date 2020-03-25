import React, { Component } from 'react';

const EmployeeAdd = (props) => {

  const title = props.data.post && 'Add' || 'Edit';
  const submitTitle = props.data.post && 'Submit' || 'Save';
  const cancelButton = <button onClick={props.exitEdit} className="btn btn-sm btn-danger" >Cancel</button>;
  let btnClass = 'btn mr-2 btn-sm btn-';
  btnClass += props.data.post && 'primary' || 'success';
  const readonly = !props.data.post && true || false;
    return (
      <center>
        <p className="h2">{title} Employee</p>
        <hr />
        <form onSubmit={props.onSubmit}>
          <div className="form-group row">
            <label className="col-sm-4">Name: </label>
            <div className="col-sm-8">
              <input
                type="text"
                readOnly={readonly}
                name="name"
                onChange={props.onChange}
                value={props.data.employee.name}
                className="form-control w-50 form-control-sm"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4">Email: </label>
            <div className="col-sm-8">
              <input
                type="email"
                name="email"
                onChange={props.onChange}
                value={props.data.employee.email}
                className="form-control w-50 form-control-sm"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4">Age: </label>
            <div className="col-sm-8">
              <input
                type="number"
                name="age"
                onChange={props.onChange}
                value={props.data.employee.age}
                className="form-control w-50 form-control-sm"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4">Salary: </label>
            <div className="col-sm-8">
              <input
                type="number"
                name="salary"
                onChange={props.onChange}
                value={props.data.employee.salary}
                className="form-control w-50 form-control-sm"
              />
            </div>
          </div>
          <button type="submit" className={btnClass}>
            {submitTitle}
          </button>
          { !props.data.post && cancelButton }
        </form>
      </center>
    );
}
 
export default EmployeeAdd;