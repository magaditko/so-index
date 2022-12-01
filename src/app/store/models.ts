export interface Question {
    question_id: number;
    title: string;
    score: number;
    tags: string[];
    creation_date: number;
    last_edit_date?: number;
    owner_name: string;
    owner_profile_image: string;
    answer_count: number;
    body?: string
}

export interface QuestionDetails {
    body: string;
    question_id: number
}

export interface SoState {
    feed: Question[];
    bookmarkedFeed: Question[];
    bookmarked: Question[];
    currentQuestion: Question;
}