import React, { Component } from 'react';
import EmployeeAdd from './employeeAdd';
import EmployeeList from "./employeeList";
import axios from "axios";

class Employee extends Component {

  //Initialize State
  state = {
    listState: {
      loading: true,
      employees: []
    },
    addState: {
      post: true,
      employee: {
        id:"",
        name: "",
        age: "",
        email: "",
        salary: ""
      }
    }
  };

  //Copy if Initial Add State
  initialEmployeeState = { ...this.state.addState.employee };

  //Fetch Data into Emp List
  async componentDidMount() {
    const url = "http://localhost:3030/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      listState: {
        loading: false,
        employees: data.Items
      }
    });
  }

  //Handle form submit
  handleSubmit = e => {
    e.preventDefault();

    let newEmployee = {
      ...this.state.addState.employee
    };

    const {post} = this.state.addState;
    if(post) {
      delete newEmployee.id;

      const url = "http://localhost:3030/add";
      axios
        .post(url, newEmployee)
        .then(res => {
          this.incrementList(newEmployee, res.data);
          // console.log(res.data);
          this.setState({
            addState: {
              post: true,
              employee: { ...this.initialEmployeeState }
            }
          });
        })
        .catch(err => console.log(err));
    } else {
      // console.log("UPDATE:"+newEmployee.id);
      const url = "http://localhost:3030/update/" + newEmployee.id;
      axios.put(url,newEmployee)
        .then(res => {
          // console.log(res);
          this.updateList(newEmployee.name, res.data.Attributes,newEmployee.id);
        })
        .catch(err => console.log(err));
    }
  };

  //Update item of Emp List
  updateList(name,data,id) {
    const updatedEmp = {
      id: id,
      name: name,
      email: data.email,
      salary: data.salary,
      age: data.age
    };
    // console.log(newState);
    const index = this.state.listState.employees.findIndex(emp => emp.id === id);
    let newState = [...this.state.listState.employees];
    // console.log(newState[index]);
    newState[index] = updatedEmp;
    // console.log(newState);
    this.setState({
      addState:{
        post: true,
        employee: {
          ...this.initialEmployeeState
        }
      },
        listState:{
          employees: [...newState]
        }
    });
  }

  //Add item to Employee List
  incrementList = (employee,id) => {
    const { employees } = { ...this.state.listState };
    employee['id'] = id;
    employees.push(employee);
    // console.log(employees);
  };

  //Handle Change in input fileds
  handleChange = e => {
    const { name, value } = e.target;
    const { employee } = { ...this.state.addState };
    const currentState = employee;
    currentState[name] = value;
    if(this.state.addState.post) {
      this.setState({ addState: { post: true, employee: currentState} });
    }else {
      this.setState({ addState: { post: false, employee: currentState } });
    }
  };

  //Handle Delete
  handleDelete = (e) => {
    // console.log('Delete: id:' + e.target.id);
    if(window.confirm('Are you Sure?')) {
      const { id } = e.target;
      const url = "http://localhost:3030/delete/" + id;
      axios
        .delete(url)
        .then(res => {
          // console.log(res.status)
          if (res.status === 200)
            this.decrementList(id);
        })
        .catch(err => console.log(err));
    }
  };

  //Delete Item From List
  decrementList = id => {
    const oldState = [...this.state.listState.employees];
    const newState = oldState.filter(employee => employee.id !== id );
    this.setState({
      listState:{
        employees: [...newState]
      }
    });
  };

  //Handle edit
  handleEdit = e => {
    const {id} = e.target;
    const employee = this.state.listState.employees.filter(item => item.id === id);
    // console.log(employee);
    this.setState({
      addState:{
        post: false,
        employee: {
          ...employee[0]
        }
      }
    });
  };

  handleExit = e => {
    this.setState({
      addState:{
        post: true,
        employee: {
          ...this.initialEmployeeState
        }
      }
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <EmployeeAdd
            data={this.state.addState}
            exitEdit={e => this.handleExit(e)}
            onSubmit={e => this.handleSubmit(e)}
            onChange={e => this.handleChange(e)}
          />
        </div>
        <div className="col-md-12 col-lg-6">
          <EmployeeList 
            data={this.state.listState} 
            onDelete={e => this.handleDelete(e)} 
            onEdit={e => this.handleEdit(e)} 
          />
        </div>
      </div>
    );
  }
}

export default Employee;