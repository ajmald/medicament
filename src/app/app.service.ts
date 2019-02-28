import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import {Pathologie} from '../Pathologie';
import {Medicament} from '../Medicament';
import { catchError, map, tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AppService {

  private baseUrl = "https://open-medicaments.fr/api/v1/medicaments";
  private proxyURL = "https://ng-cors-proxy.herokuapp.com/";
  private targetUrl = this.proxyURL + this.baseUrl;
 




  constructor(private http: HttpClient) { 

  }

  getMedicaments() {
    let url = this.targetUrl + "analgesiques";
    return this.http.get(url);
    }


 


 getMedicamentByPathology(name: string): Observable<Medicament> {
  var params = new HttpParams()
  //.set('query=', `${name}`)
  .set('query',`${name}`)
  //console.log(this.targetUrl);
  var test = decodeURI(params.toString());
  return this.http.get<Medicament>(this.targetUrl,{params}).pipe(
    //return this.http.get<Medicament>(this.targetUrl + "?" + test).pipe(
    tap(_ => this.log(`fetched medicament name =${name}`)),
    catchError(this.handleError<Medicament>(`getMedicamentByPathology name=${name}`))
  );
}



getMedicamentDetailsByCodeCis(id: number){
  var params = new HttpParams();
  return this.http.get(this.targetUrl + '/' + id).pipe(
    tap(_ => this.log(`fetched medicament name =${id}`)),
    catchError(this.handleError<any>(`getMedicamentDetailsByCodeCis name=${id}`))
  );
}

private log(message: string) {
  console.log("ok");
}
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}












}


