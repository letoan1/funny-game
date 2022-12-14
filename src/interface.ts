export interface Players {
    id: number;
    name: string;
    answers: string[];
    result: string[];
    times: number;
    score: number;
}
export interface Question {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}
export interface QuestionState extends Question {
    answers: string[];
}
