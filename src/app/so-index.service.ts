import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoIndexService {
  apiUrl = 'https://api.stackexchange.com/2.3'
  constructor(private http: HttpClient) { }

  getMostRecentQuestions(pageNumber: number): Observable<Question[]> {
    return this.http.get(
      `/questions?page=${pageNumber}&pagesize=10&order=desc&sort=creation&sit
      e=stackoverflow`
    ).pipe(
      map((res: any) => {
        return this.mapResponse(res);
      })
    );
  }

  getMostRecentFiltered(pageNumber: number, tag: string) {
    return this.http.get(
      `/questions?page=${pageNumber}&tagged=${tag}&pagesize=10&order=desc&sort
      =creation&site=stackoverflow`
    );
  }

  getQuestion(questionIds: number[]) {
    let questionIdsString = questionIds.join(';')
    return this.http.get(
      `/questions/${questionIdsString}?site=stackoverflow`
    );
  }

  getQuestionDetails(questionId: number) {
    return this.http.get(
      `/questions/${questionId}?site=stackoverflow&filter=!bBWABX2t.8zvmY`
    );
  }

  private mapResponse(questionsResponse: any): Question[] {
    return questionsResponse.items.map((question: any) => {
      return {
        question_id: question.question_id,
        title: question.title,
        score: question.score,
        tags: question.tags,
        creation_date: question.creation_date,
        ... (question.last_edit_date ? { last_edit_date: question.last_edit_date } : null),
        owner_name: question.owner.display_name,
        owner_profile_image: question.owner.profile_image,
        answer_count: question.answer_count
      }
    });
  }
}
