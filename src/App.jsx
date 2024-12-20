import React from 'react';
import './App.css';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import TaskInput from './TaskInput';
import TaskFilters from './TaskFilters';
import { generateTodos } from './Random';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            filter: 'all',
            hideCompleted: false,
            searchQuery: '',
            selectedImportance: [],
            isInvalid: false,
        };
    }

    handleTodoAdd = (newTask) => {
        const { name, description, importance } = newTask; 

        const trimmedName = name.trim().replace(/\s+/g, ' ');

        if (!trimmedName) {
            this.setState({ isInvalid: true });
            return;
        }

        this.setState((prevState) => ({
            todos: [
                {
                    id: Date.now(),
                    name: trimmedName,
                    description: description.trim().replace(/\s+/g, ' '), 
                    importance,
                    checked: false,
                    date: new Date().toLocaleDateString(),
                    isGenerated: false, 
                },
                ...prevState.todos, 
            ],
            isInvalid: false,
        }));
    };

    setFilter = (filter) => {
        this.setState({ filter });
    };

    toggleHideCompleted = () => {
        this.setState((prevState) => ({
            hideCompleted: !prevState.hideCompleted,
        }));
    };

    handleSearchChange = (searchQuery) => {
        this.setState({ searchQuery });
    };

    handleImportanceFilterChange = (selectedImportance) => {
        this.setState({ selectedImportance });
    };

    generate100Todos = () => {
        const generatedTodos = generateTodos(10000).map(todo => ({
            ...todo,
            isGenerated: true, 
            checked: false,
        }));

        this.setState((prevState) => ({
            todos: [...prevState.todos, ...generatedTodos], 
        }));
    };

    clearAllTodos = () => {
        this.setState({ todos: [] }); 
    };

    getFilteredTodos = () => {
        const { todos, filter, hideCompleted, searchQuery, selectedImportance } = this.state;
        let filteredTodos = todos;

        if (hideCompleted) {
            filteredTodos = filteredTodos.filter((todo) => !todo.checked);
        }

        if (searchQuery) {
            filteredTodos = filteredTodos.filter((todo) =>
                todo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                todo.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedImportance.length > 0) {
            filteredTodos = filteredTodos.filter((todo) => selectedImportance.includes(todo.importance));
        }
        
        switch (filter) {
            case 'completed':
                filteredTodos = filteredTodos.filter((todo) => todo.checked);
                break;
            case 'incomplete':
                filteredTodos = filteredTodos.filter((todo) => !todo.checked);
                break;
            default:
                break;
        }

        filteredTodos = filteredTodos.sort((a, b) => a.checked - b.checked);

        return filteredTodos;
    };

    render() {
        const filteredTodos = this.getFilteredTodos();

        return (
            <div className="app-container">
                <div className="todo-title">
                    To Do List
                    <img src="https://cdn-icons-png.flaticon.com/512/564/564445.png" alt="To-Do Icon" />
                </div>

                <TaskInput onTodoAdd={this.handleTodoAdd} isInvalid={this.state.isInvalid} />

                <TaskFilters
                    hideCompleted={this.state.hideCompleted}
                    toggleHideCompleted={this.toggleHideCompleted}
                    searchQuery={this.state.searchQuery}
                    onSearchChange={this.handleSearchChange}
                    selectedImportance={this.state.selectedImportance}
                    onImportanceFilterChange={this.handleImportanceFilterChange}
                />

                <FilterButtons currentFilter={this.state.filter} setFilter={this.setFilter} />

                <button onClick={this.generate100Todos}>Generate Todos</button>
                <button onClick={this.clearAllTodos}>Delete all Todos</button> 

                {filteredTodos.length > 0 ? (
                    <TodoList
                        todos={filteredTodos}
                        onTodoChecked={this.handleTodoChecked}
                        onTodoDelete={this.handleTodoDelete}
                    />
                ) : (
                    <div className="no-tasks-message">По вашим критериям ничего не найдено</div>
                )}
            </div>
        );
    }

    handleTodoChecked = (index) => (e) => {
        const newTodo = { ...this.state.todos[index] };
        
        
        if (!newTodo.checked || newTodo.isGenerated) {
            newTodo.checked = e.target.checked;
        }
        
        const newTodos = this.state.todos.map((todo, i) => (i === index ? newTodo : todo));
        this.setState({
            todos: newTodos,
        });
    };

    handleTodoDelete = (index) => () => {
        const newTodos = this.state.todos.filter((_, i) => i !== index);
        this.setState({
            todos: newTodos,
        });
    };
}

export default App;
