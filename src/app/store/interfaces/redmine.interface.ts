export interface IRedmineIssue {
  data: string
}

export interface IGetMyIssuesResponse {
  issues: IRedmineIssue[];
  limit: number;
  offset: number;
  total_count: number
}

//Intentionally incomplete
export interface IRedmineIssue {
  assigned_to: {id: number; name: string};
  id: number;
  priority: {id: number; name: string};
  status: {id: number; name: string};
  subject: string;
}

export interface IRedmineState {
  myIssues: IRedmineIssue[];
  myRedmineId: number | null;
}
