import { createAction, props } from '@ngrx/store';
import { Question } from '../models';

export enum ActionTypes {
  LoadFeed = '[Feed] Load',
  LoadFeedSuccess = '[Feed] Load Success',
  AddBookmark = '[Bookmark] Add',
  AddBookmarkSuccess = '[Bookmark] Add Success',
  RemoveBookmark = '[Bookmark] Remove',
  RemoveBookmarkSuccess = '[Bookmark] Remove Success',
  LoadQuestion = '[Question] Load',
  LoadQuestionSuccess = '[Question] Load Success',
}

export const loadFeed = createAction(
  ActionTypes.LoadFeed,
  props<{ page: number }>()
);

export const loadFeedSuccess = createAction(
  ActionTypes.LoadFeedSuccess,
  props<{ data: Question[] }>()
);

export const addBookmark = createAction(
  ActionTypes.AddBookmark,
  props<{ questionId: number }>()
)

export const removeBookmark = createAction(
  ActionTypes.RemoveBookmark,
  props<{ questionId: number }>()
)

export const loadQuestion = createAction(
  ActionTypes.LoadQuestion,
  props<{ question_id: number }>()
)

export const loadQuestionSuccess = createAction(
  ActionTypes.LoadQuestionSuccess,
  props<{ data: Question }>()
);
