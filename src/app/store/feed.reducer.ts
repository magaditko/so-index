import { Action, createReducer, on } from '@ngrx/store';
import { SoState } from '../models';
import * as feed from './feed.actions';


export const feedFeatureKey = 'soFeed';

export const initialState: SoState = {
  feed: [],
  bookmarked: []
};

export const reducer = createReducer(
  initialState,
  on(feed.loadFeedSuccess, (state, { data }) => ({
    ...state,
    feed: [
      ...state.feed,
      ...data
    ]
  })),
  on(feed.addBookmark, (state, { questionId }) => ({
    ...state,
    bookmarked: [...state.bookmarked, questionId]
  })),
  on(feed.removeBookmark, (state, { questionId }) => ({
    ...state,
    bookmarked: [...state.bookmarked.filter(q => q !== questionId)]
  }))
);
