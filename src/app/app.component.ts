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
import { GoogleBooksService } from './services/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  //We use pipes when using selectors to select parts of the state
  books$ = this.store.pipe(select(selectBooks));
  bookCollection$ = this.store.pipe(select(selectBookCollection));

  /**
   * STEP 4.
   *
   * Injection of the Store service to dispatch actions and select the current state of the counter.
   * Here we inject the store without providing it a generic type. In this case it defaults to Store<T = object>
   */
  constructor(private booksService: GoogleBooksService, private store: Store) {
    this.books$.subscribe((state) => console.log(state));
  }

  onAdd(bookId) {
    this.store.dispatch(addBook({ bookId }));

    //dispatching the action that triggers the effect. This is only for demonstration, not a bug-free, nice solution
    this.store.dispatch(addBookSuccess());
  }

  onRemove(bookId) {
    //the prop is not destructured here, it is destructured at the action's side
    this.store.dispatch(removeBook(bookId));
  }

  ngOnInit() {
    //loads the list of books at startup (this behavior should be performed using effects to reduce the component's responsibility)
    this.booksService
      .getBooks()
      .subscribe((Book) => this.store.dispatch(retrievedBookList({ Book })));
  }
}
