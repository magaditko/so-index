import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Question, SoState } from '../models';
import { addBookmark, loadFeed, removeBookmark } from '../store/feed.actions';
import { getFeed } from '../store/feed.selectors';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss']
})
export class MainFeedComponent implements OnInit {
  feed$: any;
  constructor(private store: Store<SoState>) {}

  ngOnInit(): void {
    this.feed$ = this.store.pipe(select(getFeed)); 
    this.store.dispatch(loadFeed({page: 1}));
  }

  addToBookmarks(question: Question): void {
    this.store.dispatch(addBookmark({questionId: question.question_id}))
  }

  removeFromBookmarks(question: Question): void {
    this.store.dispatch(removeBookmark({questionId: question.question_id}))
  }
}
