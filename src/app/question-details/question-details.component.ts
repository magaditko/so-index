import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Question, SoState } from '../models';
import { clearQuestion } from '../store/feed.actions';
import { getQuestion, getBookmarked } from '../store/feed.selectors';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  questionDetails: Question | undefined;
  bookmarked: Question[] | undefined;
  showDetails = true;

  constructor(private store: Store<SoState>) {
    this.subscriptions.add(
      this.store.pipe(select(getQuestion)).subscribe(question => {
        if (question.question_id) {
          this.questionDetails = question;
        }
      })
    )

    this.subscriptions.add(
      this.store.pipe(select(getBookmarked)).subscribe(bookmarked => {
        this.bookmarked = bookmarked;
      })
    )
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(clearQuestion());
  }
}
