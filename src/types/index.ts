export interface University {
  id: number;
  university: string;
  state: string;
  scholarship_name: string;
  amount: string;
  deadline: string;
  deadline_date?: string; // ISO format for calculation
  test_policy: string;
  english_proficiency?: string;
  app_fee?: string;
  url: string;
  tags: string[];
}
