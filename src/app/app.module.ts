import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { Action, ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { MainFeedComponent } from './main-feed/main-feed.component';
import { BookmarkedQuestionsComponent } from './bookmarked-questions/bookmarked-questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import * as fromFeed from './store/feed.reducer';
import { FeedEffects } from './store/feed.effects';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SoState } from './store/models';
import { storageSync } from '@larscom/ngrx-store-storagesync';
import { QuestionComponent } from './question/question.component';
import { RouterModule, Routes } from '@angular/router';
import { SafePipe } from './safe.pipe';

function reducer(state: SoState | undefined, action: Action): SoState {
  return fromFeed.reducer(state, action);
}

export const reducers: ActionReducerMap<{ soFeed: SoState }> = {
  soFeed: reducer,
};

export function storageSyncReducer(reducer: ActionReducer<SoState>): ActionReducer<SoState> {
  const metaReducer = storageSync<SoState>({
    features: [
      { stateKey: 'soFeed', excludeKeys: ['feed', 'bookmarkedFeed' ] },
    ],
    storage: window.localStorage
  });

  return metaReducer(reducer);
}
const metaReducers: MetaReducer<any>[] = [storageSyncReducer];

const routes: Routes = [
  { path: 'main-feed', component: MainFeedComponent },
  { path: 'bookmarked-questions', component: BookmarkedQuestionsComponent },
  { path: 'question-details', component: QuestionDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainFeedComponent,
    BookmarkedQuestionsComponent,
    QuestionDetailsComponent,
    QuestionComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([FeedEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true
    }),
    FontAwesomeModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
