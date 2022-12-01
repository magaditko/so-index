import { createAction, props } from '@ngrx/store';
import { Question, QuestionDetails } from '../models';

export enum ActionTypes {
  LoadFeed = '[Feed] Load',
  LoadFeedSuccess = '[Feed] Load Success',
  LoadBookmarked = '[Bookmarked] Load',
  LoadBookmarkedSuccess = '[Bookmarked] Load Success',
  AddBookmark = '[Bookmark] Add',
  AddBookmarkSuccess = '[Bookmark] Add Success',
  RemoveBookmark = '[Bookmark] Remove',
  RemoveBookmarkSuccess = '[Bookmark] Remove Success',
  LoadQuestion = '[Question] Load',
  LoadQuestionSuccess = '[Question] Load Success',
  ClearQuestion = '[Question] ClearQuestion',
}

export const loadFeed = createAction(
  ActionTypes.LoadFeed,
  props<{ page: number }>()
);

export const loadFeedSuccess = createAction(
  ActionTypes.LoadFeedSuccess,
  props<{ data: Question[] }>()
);

export const loadBookmarked = createAction(
  ActionTypes.LoadBookmarked,
  props<{ questionIds: number[] }>()
);

export const loadBookmarkedSuccess = createAction(
  ActionTypes.LoadBookmarkedSuccess,
  props<{ data: Question[] }>()
);

export const addBookmark = createAction(
  ActionTypes.AddBookmark,
  props<{ question: Question }>()
)

export const removeBookmark = createAction(
  ActionTypes.RemoveBookmark,
  props<{ question: Question }>()
)

export const loadQuestion = createAction(
  ActionTypes.LoadQuestion,
  props<{ questionId: number }>()
)

export const loadQuestionSuccess = createAction(
  ActionTypes.LoadQuestionSuccess,
  props<{ data: QuestionDetails }>()
);

export const clearQuestion = createAction(
  ActionTypes.ClearQuestion);
