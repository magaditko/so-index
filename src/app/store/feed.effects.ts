import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SoState } from '../models';
import { SoIndexService } from '../so-index.service';
import { ActionTypes } from './feed.actions';



@Injectable()
export class FeedEffects {


  constructor(
    private actions$: Actions,
    private soService: SoIndexService,
    private store: Store<SoState>,
    ) {}

  setFeed = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionTypes.LoadFeed),
        mergeMap((data: {page: number}) => 
          this.soService.getMostRecentQuestions(data.page).pipe(
            map(q => {
              return {type: ActionTypes.LoadFeedSuccess, data: q};
            })
          )
        )
      )
  );
}
