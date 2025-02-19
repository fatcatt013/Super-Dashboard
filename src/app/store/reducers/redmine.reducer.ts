import { createReducer, on } from "@ngrx/store";
import { IRedmineState } from "../interfaces/redmine.interface";
import { getMyIssuesSuccess } from "../actions/redmine.actions";


const initialState: IRedmineState = {
  myIssues: []
}

export const redmineReducer = createReducer(
  initialState,
  on(
    getMyIssuesSuccess,
    (state, {data}): IRedmineState => ({
      ...state,
      myIssues: data.issues
    })
  ),
);
