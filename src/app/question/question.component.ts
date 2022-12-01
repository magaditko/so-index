import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Question, SoState } from '../store/models';
import { addBookmark, loadQuestion, removeBookmark } from '../store/feed.actions';
import { faBookmark as bookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as bookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  constructor(private store: Store<SoState>, private router: Router, private route: ActivatedRoute) {}

  @Input() question: Question | undefined;
  @Input() bookmarks: number[] | any;
  @Input() showDetails: boolean = false;

  faBookmarkSolid = bookmarkSolid;
  faBookmarkRegular = bookmarkRegular;

  ngOnInit() {}

  addToBookmarks(question: Question): void {
    this.store.dispatch(addBookmark({question: question}))
  }

  removeFromBookmarks(question: Question): void {
    this.store.dispatch(removeBookmark({question: question}))
  }

  goToDetails(questionId: number): void {
    this.store.dispatch(loadQuestion({questionId: questionId}))
    this.router.navigate(['/question-details'], { replaceUrl: true });
  }

  checkBookmarked(questionId: number, bookmarked: Question[]) {
    let element = bookmarked.findIndex(el => el.question_id === questionId)
    return element >= 0;
  }
}
