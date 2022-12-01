import { createReducer, on } from '@ngrx/store';
import { Question, SoState } from './models';
import * as feed from './feed.actions';


export const feedFeatureKey = 'soFeed';

export const initialState: SoState = {
  feed: [],
  bookmarkedFeed: [],
  bookmarked: [],
  currentQuestion: {} as Question,
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
  on(feed.addBookmark, (state, { question }) => ({
    ...state,
    bookmarked: [...state.bookmarked, question]
  })),
  on(feed.removeBookmark, (state, { question }) => ({
    ...state,
    bookmarked: [...state.bookmarked.filter(q => q.question_id !== question.question_id)],
    bookmarkedFeed: [...state.bookmarkedFeed.filter(q => q.question_id !== question.question_id)]
  })),
  on(feed.loadBookmarkedSuccess, (state, { data }) => ({
    ...state,
    bookmarkedFeed: [
      ...data
    ]
  })),
  on(feed.loadQuestionSuccess, (state, { data }) => ({
    ...state,
    currentQuestion: {
      ...findFromFeed(data.question_id, state.feed, state.bookmarked),
      body: data.body
    }
  })),
  on(feed.clearQuestion, (state) => ({
    ...state,
    currentQuestion: {} as Question
  })),
);

function findFromFeed(questionId: number, feed: Question[], bookmarked: Question[]) {
  let fromFeed = feed.filter(question => question.question_id === questionId)[0]
  let fromBookmarks = bookmarked.filter(question => question.question_id === questionId)[0]

  if(fromFeed?.question_id) {
    return fromFeed
  } else if(fromBookmarks?.question_id) {
    return fromBookmarks
  } else {
    return {} as Question
  }
}

