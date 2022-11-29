import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SoState } from '../models';

export const getAppState = createFeatureSelector<SoState>('soFeed');

export const getState = createSelector(getAppState, (state: SoState) => state);
export const getFeed = createSelector(getAppState, (state: SoState) => state.feed);
export const getBookmarked = createSelector(getAppState, (state: SoState) => state.bookmarked);