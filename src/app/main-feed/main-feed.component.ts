import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Question, SoState } from '../models';
import { addBookmark, loadFeed, removeBookmark } from '../store/feed.actions';
import { getBookmarked, getFeed } from '../store/feed.selectors';
import { faBookmark as bookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as bookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss']
})
export class MainFeedComponent implements OnInit {
  faBookmarkSolid = bookmarkSolid;
  faBookmarkRegular = bookmarkRegular;
  feed$: Observable<Question[]> | undefined;
  bookmarks$: Observable<number[]> | undefined;
  throttle = 300;
  scrollDistance = 0.2;
  page = 1;

  constructor(private store: Store<SoState>) {}

  ngOnInit(): void {
    this.feed$ = this.store.pipe(select(getFeed)); 
    this.bookmarks$ = this.store.pipe(select(getBookmarked));
    this.store.dispatch(loadFeed({page: this.page}));
  }

  addToBookmarks(question_id: number): void {
    this.store.dispatch(addBookmark({questionId: question_id}))
  }

  removeFromBookmarks(question_id: number): void {
    this.store.dispatch(removeBookmark({questionId: question_id}))
  }

  onScrollEnd() {
    this.page += 1;
    if (this.page <= 10) {
      this.store.dispatch(loadFeed({ page: this.page }));
    }
  }
}
