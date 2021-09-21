import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as bookActions from '../actions/book.action';
import { AppState } from '../app.state';
import * as fromBooks from '../selectors/book.selector';

@Injectable()
export class CollectionEffects {
  addBookToCollectionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookActions.addBookSuccess),
        concatLatestFrom((action) =>
          this.store.select(fromBooks.getCollectionBookIds)
        ),
        tap(([action, bookCollection]) => {
          if (bookCollection.length === 1) {
            window.alert(
              'Congrats on adding your first book!' +
                ' \nThe dispatched action was "' +
                action.type +
                '"'
            );
          } else {
            window.alert(
              'You have added book number ' +
                bookCollection.length +
                '. \nThe dispatched action was "' +
                action.type +
                '"'
            );
          }
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store<AppState>) {}
}
