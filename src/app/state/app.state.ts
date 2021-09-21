import { Book } from '../book-list/books.model';

/**
 * STEP 1.
 *
 * Definition of the Store and the data it stores applicationwide
 */
export interface AppState {
  /** Stores the list of available books retrieved from Google Books API */
  books: ReadonlyArray<Book>;
  /** Stores the books that were added to our collection */
  collection: ReadonlyArray<string>;
}
