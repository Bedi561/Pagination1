/* eslint-disable no-unused-vars */
import { useEffect, useReducer } from 'react';
// useEffect: A React hook that runs some code after the component renders.
// useReducer: A React hook for managing complex states. 
import './App.css';

const itemsPerPage = 5;

// This is a reducer function for useReducer.
// It controls how the state changes based on the action.type.

/* 
Breakdown of the code:
state: The current state (e.g., current page, total items).
action: An object that describes what to do. It has two parts:
type: The type of action (e.g., "SET_CURRENT_PAGE").
payload: The new value to update in the state */
const paginationReducer = (state, action) => {
  switch (action.type) {
    // Updates currentPage in the state with the value of action.payload.
    // ...state: Keeps all other parts of the state unchanged.
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_TOTAL_ITEMS':
      return { ...state, totalItem: action.payload };
    default:
      return state;
  }
};

function App() {
  // dispatch: A function used to send actions 
  // paginationState: The current state managed by the paginationReducer
  const [paginationState, dispatch] = useReducer(paginationReducer, {
    currentPage: 1,
    totalItem: 0,
  });

  const data = Array.from({ length: 25 }, (_, index) => `Item ${index + 1}`);

  // Purpose: Sets the total number of items (data.length) in the reducer state.
  // dispatch: Sends an action of type SET_TOTAL_ITEMS with data.length (25) as the payload.
  useEffect(() => {
    dispatch({ type: 'SET_TOTAL_ITEMS', payload: data.length });
  }, [data.length]);

  const startIndex = (paginationState.currentPage - 1) * itemsPerPage;
  const lastIndex = startIndex + itemsPerPage;

  const displayedItems = data.slice(startIndex, lastIndex);

  const handlePageClick = (newPage) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: newPage });
  };

  return (
    <div>
      <h2>Pagination</h2>
      <ul>
        {displayedItems.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>

      <div>
        <button
          onClick={() => handlePageClick(paginationState.currentPage - 1)}
          disabled={paginationState.currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageClick(paginationState.currentPage + 1)}
          disabled={lastIndex >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;


/* 
How It Works Step by Step
Initialization:

Sets the initial state with currentPage: 1 and totalItem: 0.
Creates an array of 25 items (data).
Effect Hook:

After rendering, sets the total items (data.length) in the state.
Pagination Logic:

Calculates which items to display based on currentPage.
Rendering:

Displays the current page's items.
Enables navigation between pages using "Previous" and "Next" buttons.
This code effectively implements a simple pagination system. It uses useReducer for state management, ensuring clear separation of logic and updates.

*/