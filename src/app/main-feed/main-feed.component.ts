import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Question, SoState } from '../models';
import { loadFeed } from '../store/feed.actions';
import { getBookmarked, getFeed } from '../store/feed.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss']
})
export class MainFeedComponent implements OnInit {
  feed$: Observable<Question[]> | undefined;
  bookmarks$: Observable<Question[]> | undefined;
  throttle = 300;
  scrollDistance = 0.2;
  page = 1;

  constructor(private store: Store<SoState>) {}

  ngOnInit(): void {
    this.feed$ = this.store.pipe(select(getFeed)); 
    this.bookmarks$ = this.store.pipe(select(getBookmarked));
    this.store.dispatch(loadFeed({page: this.page}));
  }

  onScrollEnd() {
    this.page += 1;
    if (this.page <= 10) {
      this.store.dispatch(loadFeed({ page: this.page }));
    }
  }
}
