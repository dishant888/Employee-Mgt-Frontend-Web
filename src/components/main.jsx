import React, { Component } from 'react';

class Main extends Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"]
  };

  renderTags() {
    if (this.state.tags.length === 0) return <p>Empty!</p>;

    return this.state.tags.map(tag => <li key={tag}>{tag}</li>);
  }

  handleIncrement = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  getBadgeClasses() {
    let classes = "badge ";
    classes += this.state.count === 0 ? "badge-danger" : "badge-success";
    return classes;
  }

  handleDecrement = () => {
      if(this.state.count > 0) {
        this.setState({
            count:this.state.count - 1
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <center>
          <br />
          <span style={{ fontSize: 20 }} className={this.getBadgeClasses()}>
            {this.state.count}
          </span>
          <br />
          <br />
          <button onClick={this.handleIncrement} className="btn btn-success">
            Increment
          </button>
          <br />
          <br />
          <button onClick={this.handleDecrement} className="btn btn-warning">
            Decrement
          </button>
          <br />
          <br />
          <ul>{this.renderTags()}</ul>
        </center>
      </React.Fragment>
    );
  }
}
 
export default Main;