import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import {
  selectBookCollection,
  selectBooks,
} from './state/selectors/book.selector';
import {
  retrievedBookList,
  addBook,
  removeBook,
  addBookSuccess,
} from './state/actions/book.action';
import { GoogleBooksService } from './book-list/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  books$ = this.store.pipe(select(selectBooks));
  bookCollection$ = this.store.pipe(select(selectBookCollection));

  /**
   * STEP 4.
   *
   * Injection of the Store service to dispatch actions and select the current state of the counter.
   ************** We inject the store by providing it a generic type, the structure defined at STEP 2.
   */
  constructor(private booksService: GoogleBooksService, private store: Store) {
    this.books$.subscribe((state) => console.log(state));
  }

  onAdd(bookId) {
    //not destructured here
    this.store.dispatch(addBook(bookId));
    this.store.dispatch(addBookSuccess());
  }

  onRemove(bookId) {
    this.store.dispatch(removeBook({ bookId }));
  }

  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((Book) => this.store.dispatch(retrievedBookList({ Book })));
  }
}
