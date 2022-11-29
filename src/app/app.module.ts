import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { MainFeedComponent } from './main-feed/main-feed.component';
import { BookmarkedQuestionsComponent } from './bookmarked-questions/bookmarked-questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import * as fromFeed from './store/feed.reducer';
import { FeedEffects } from './store/feed.effects';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainFeedComponent,
    BookmarkedQuestionsComponent,
    QuestionDetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({soFeed: fromFeed.reducer}),
    EffectsModule.forRoot([FeedEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
