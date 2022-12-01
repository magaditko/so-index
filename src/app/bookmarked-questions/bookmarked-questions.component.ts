import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { Question, SoState } from '../store/models';
import { loadBookmarked } from '../store/feed.actions';
import { getBookmarked, getBookmarkedFeed } from '../store/feed.selectors';

@Component({
  selector: 'app-bookmarked-questions',
  templateUrl: './bookmarked-questions.component.html',
  styleUrls: ['./bookmarked-questions.component.scss']
})
export class BookmarkedQuestionsComponent implements OnInit{
  bookmarks: Question[] | undefined;
  bookmarked$: Observable<Question[]> | undefined;

  constructor(private store: Store<SoState>) {}
  
  ngOnInit(): void {
    this.bookmarked$ = this.store.pipe(select(getBookmarkedFeed)); 
    this.store.pipe(select(getBookmarked), first()).subscribe(data => {
      this.bookmarks = data;
      let ids = data.map(q => {
        return q.question_id
      });
      if(data.length > 0) {
        this.store.dispatch(loadBookmarked({questionIds: ids}));
      }
    });
  }
}
