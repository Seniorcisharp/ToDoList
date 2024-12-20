import React from "react";

class TaskInput extends React.Component {
  state = {
    name: '',
    description: '',
    importance: 'low', 
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onTodoAdd({
      name: this.state.name,
      description: this.state.description,
      importance: this.state.importance,
    });


    this.setState({ name: '', description: '', importance: 'low' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange}
          placeholder="Task name"
        />
        <textarea
          name="description"
          value={this.state.description}
          onChange={this.handleInputChange}
          placeholder="Task description"
        />
        <select
          name="importance"
          value={this.state.importance}
          onChange={this.handleInputChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    );
  }
}

export default TaskInput;
