
import React from "react";

const FilterButtons = ({ currentFilter, setFilter }) => (
  <div className="filter-buttons">
    <button 
      onClick={() => setFilter('all')}
      className={currentFilter === 'all' ? 'active' : ''}
    >
      All
    </button>
    <button 
      onClick={() => setFilter('completed')}
      className={currentFilter === 'completed' ? 'active' : ''}
    >
      Completed
    </button>
    <button 
      onClick={() => setFilter('incomplete')}
      className={currentFilter === 'incomplete' ? 'active' : ''}
    >
      Incomplete
    </button>
  </div>
);

export default FilterButtons;

