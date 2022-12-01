import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { SoState } from './models';
import { SoIndexService } from './so-index.service';
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

  setBookmarked = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionTypes.LoadBookmarked),
        mergeMap((data: {questionIds: number[]}) => 
          this.soService.getQuestion(data.questionIds).pipe(
            map(q => {
              return {type: ActionTypes.LoadBookmarkedSuccess, data: q};
            })
          )
        )
      )
  );

  setCurrentQuestion = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionTypes.LoadQuestion),
        mergeMap((data: {questionId: number}) => 
          this.soService.getQuestionDetails(data.questionId).pipe(
            map(q => {
              return {type: ActionTypes.LoadQuestionSuccess, data: q};
            })
          )
        )
      )
  );
}
