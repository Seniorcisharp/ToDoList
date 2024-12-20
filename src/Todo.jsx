import React from "react";

class Todo extends React.PureComponent {
  handleTodoClick = () => {
    const { todo } = this.props;
    console.log('Todo clicked:', todo);
  };

  
  getImportanceColor = (importance) => {
    switch (importance) {
      case 'low':
        return '#28a745'; 
      case 'medium':
        return '#ffc107'; 
      case 'high':
        return '#dc3545'; 
      default:
        return '#000';
    }
  };

  render() {
    const { todo, onTodoChecked, onTodoDelete } = this.props;

    return (
      <li className={`todo-item ${todo.checked ? 'completed' : ''}`} onClick={this.handleTodoClick}>
        <div>
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={onTodoChecked}
          />
          <span>{todo.name}</span>
          {todo.description && (
            <div className="todo-description">
              <strong></strong> {todo.description}
            </div>
          )}
          <div 
            className="todo-importance" 
            style={{ color: this.getImportanceColor(todo.importance) }}
          >
             {todo.importance}
          </div>
        </div>
        <button onClick={onTodoDelete}>
          <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete" width="16" />
        </button>
      </li>
    );
  }
}

export default Todo;
