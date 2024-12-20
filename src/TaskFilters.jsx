
import React from 'react';

class TaskFilters extends React.Component {
  handleSearchChange = (e) => {
    this.props.onSearchChange(e.target.value);
  };

  handleImportanceChange = (e) => {
    const importance = e.target.value;
    const isChecked = e.target.checked;

    let selectedImportance = [...this.props.selectedImportance];

    if (isChecked) {
      selectedImportance.push(importance);
    } else {
      selectedImportance = selectedImportance.filter(i => i !== importance);
    }

    this.props.onImportanceFilterChange(selectedImportance);
  };

  render() {
    const { hideCompleted, toggleHideCompleted, searchQuery, selectedImportance } = this.props;

    return (
      <div className="filters">
        <label>
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={toggleHideCompleted}
          />
          Hide completed
        </label>

        <input
          type="text"
          value={searchQuery}
          onChange={this.handleSearchChange}
          placeholder="Search tasks"
        />

        <div className="importance-filters">
          <label>
            <input
              type="checkbox"
              value="low"
              checked={selectedImportance.includes("low")}
              onChange={this.handleImportanceChange}
            />
            Low
          </label>
          <label>
            <input
              type="checkbox"
              value="medium"
              checked={selectedImportance.includes("medium")}
              onChange={this.handleImportanceChange}
            />
            Medium
          </label>
          <label>
            <input
              type="checkbox"
              value="high"
              checked={selectedImportance.includes("high")}
              onChange={this.handleImportanceChange}
            />
            High
          </label>
        </div>
      </div>
    );
  }
}

export default TaskFilters;
