import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { LocalStorageUtils } from "../utils/local-storage";

export abstract class BaseService
{
  public localStorage = new LocalStorageUtils();
  protected urlServiceV1: string = "https://localhost:7196/api/v1/";

  protected obterHeaderJson()
  {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  protected extractData(response: any)
  {
    return response.data || {};
  }

  protected serviceError(response: Response | any)
  {
    let customError: string[] = [];

    if (response instanceof HttpErrorResponse)
    {
      if (response.statusText === "Unknown Error")
      {
        customError.push("Ocorreu um erro desconhecido");
        response.error.errors = customError;
      }
    }

    console.error(response);
    return throwError(response);
  }
}