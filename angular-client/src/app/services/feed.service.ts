import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { IFeedResponse } from '../interfaces/thingspeak/feed-response.interface';
import { FeedResponse } from '../types/thingspeak/feed-response';


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private numberOfMinutes = 5;
  private numberofResults = 10;
  private channelId = "502402";
  //private feedUrl= `https://api.thingspeak.com/channels/${this.channelId}/feeds.json?minutes=${this.numberOfMinutes}`;
  private feedUrl= `https://api.thingspeak.com/channels/${this.channelId}/feeds.json?results=${this.numberofResults}`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  read(): Observable<FeedResponse> {
    return this.http.get<FeedResponse>(this.feedUrl, this.httpOptions).pipe(
      tap(_ => console.log(`read feed`)),
      map((res: IFeedResponse) => {
        return new FeedResponse(res as IFeedResponse)
      }),
      catchError(this.handleError<FeedResponse>('getFeed', {} as FeedResponse))
    );
  }
}
