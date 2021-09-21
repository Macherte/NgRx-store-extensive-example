//handles actions that alter the user's book collection

import { createReducer, on, Action } from '@ngrx/store';
import { addBook, removeBook } from '../actions/book.action';

export const initialState: ReadonlyArray<string> = [];

/**
 * STEP 3.
 *
 * Definition of a reducer function to manage the state of our book collection.
 * Create reducer is imported from @ngrx/store, its parameters are:
 * @param initialState: the initial state, that needs to be changed according to a dispatched action
 * @param ons: functions that define what to do for each possible dispatchable action. Works like a switch-case block.
 */
export const collectionReducer = createReducer(
  initialState,
  /** creates a new state, a new array without the one book id defined in bookId that is sent along the type of the action and the current state, as a prop */
  on(removeBook, (state, { bookId }) => state.filter((id) => id !== bookId)),
  /** creates a new state, a new array that includes the book id defined in bookId, only if it's not present yet */
  on(addBook, (state, { bookId }) => {
    if (state.indexOf(bookId) > -1) return state;
    return [...state, bookId];
  })
);
