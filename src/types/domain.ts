export type Subject = 'maths' | 'english' | 'economics';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Outcome =
  | 'first_try_correct'
  | 'second_try_correct'
  | 'third_try_correct'
  | 'failed_through'
  | 'abandoned';

export interface Question {
  id: string;
  subject: Subject;
  topic: string;
  difficulty: Difficulty;
  question_text: string;
  options: string[];
  correct_index: number;
  source: string;
}
