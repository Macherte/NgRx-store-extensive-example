//handles actions that alter the list of book

import { createReducer, on, Action } from '@ngrx/store';

import { retrievedBookList } from '../actions/book.action';
import { Book } from '../../book-list/books.model';

export const initialState: ReadonlyArray<Book> = [];

/**
 * STEP 3.
 *
 * Definition of a reducer function to manage the state of the array of books.
 * Create reducer is imported from @ngrx/store, its parameters are:
 * @param initialState: the initial state, that needs to be changed according to a dispatched action
 * @param ons: functions that define what to do for each possible dispatchable action. Works like a switch-case block.
 */
export const booksReducer = createReducer(
  initialState,
  /** Simply spreads, then returns the array of Book objects */
  on(retrievedBookList, (state, { Book }) => [...Book])
);
