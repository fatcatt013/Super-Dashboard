import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType,} from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { IRedmineIssueList, RedmineService } from "src/app/services/redmine.service";
import { getMyIssues, getMyIssuesSuccess, getMyIssuesFailure } from "../actions/redmine.actions";

@Injectable()
export class RedmineEffects {
  constructor(
    private readonly actions: Actions,
    private readonly redmineService: RedmineService
  ) {}

  getMyIssues$ = createEffect(() => {
    return this.actions.pipe(
      ofType(getMyIssues),
      mergeMap(() => {
        return this.redmineService.getMyIssues().pipe(
          map((res: IRedmineIssueList) =>
            getMyIssuesSuccess({data: res})
          ),
          catchError((err: unknown) => of(getMyIssuesFailure({ error: err })))
        );
      })
    );
  });
}
