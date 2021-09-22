import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Book } from '../../book-list/books.model';

/** Simply selects the array of books from the state, then returns them */
export const selectBooks = createSelector(
  (state: AppState) => state.books,
  (books: Array<Book>) => books
);

/** Selects the book collection "sub-state" from the app state */
export const selectCollectionState = createFeatureSelector<AppState, ReadonlyArray<string>>('collection');

/** Selects the collection of books the user owns, using two other selectors as mapping functions */
export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books: Array<Book>, collection: Array<string>) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);

/** Selects only the ids of those books the user owns */
export const getCollectionBookIds = createSelector(
  selectBookCollection,
  (collection: Book[]) => collection.map((book) => book.id)
);
