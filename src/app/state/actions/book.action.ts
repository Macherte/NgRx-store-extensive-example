import { createAction, props } from '@ngrx/store';

// STEP 2. Definition of actions to express events.

/**
 * Add a book to our collection from the list of book
 * @props type -
 * @props props - payload (optional), data we want to sent along the action;
 * the id of the book we want to add to our collection.
 */
export const addBook = createAction(
  '[Book List] Add Book',
  //props<{ bookId }>()
  //destructured here
  (bookId) => ({ bookId })
);

/**
 * Remove a book from our collection
 * @props type -
 * @props props - payload (optional), data we want to sent along the action;
 * the id of the book we want to remove from our collection.
 */
export const removeBook = createAction(
  '[Book Collection] Remove Book',
  props<{ bookId }>()
);

/**
 * Retrieving a list of books from Google Books API
 * @props type -
 * @props props - payload (optional), data we want to sent along the action;
 * the list of books we fetched from Google Books API, that will be loaded to the books array.
 */
export const retrievedBookList = createAction(
  '[Book List/API] Retrieve Books Success',
  props<{ Book }>()
);

export const addBookSuccess = createAction('[Books] Add Success');
