import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType,} from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ConfigService } from "src/app/services/config.service";
import { fetchBaseConfig, fetchBaseConfigFailure, fetchBaseConfigSuccess } from "../actions/config.actions";

@Injectable()
export class ConfigEffects {
  constructor(
    private readonly actions: Actions,
    private readonly config: ConfigService
  ) {}

  fetchBaseConfig$ = createEffect(() => {
    return this.actions.pipe(
      ofType(fetchBaseConfig),
      mergeMap(() => {
        return this.config.fetchBaseConfig().pipe(
          map((res) =>
            fetchBaseConfigSuccess({data: res})
          ),
          catchError((err: unknown) => of(fetchBaseConfigFailure({ error: err })))
        );
      })
    );
  });
}
