import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { IFeedResponse } from '../interfaces/thingspeak/feed-response.interface';
import { FeedResponse } from '../types/thingspeak/feed-response';
import { Feed } from '../types/thingspeak/feed';


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private channelId = "2898553"; //todo: move to config
  private apiKey = "AZU8M1FV47KYWRTF";
  private numberOfMinutes = 5;
  private feedUrlLastMinutes = `https://api.thingspeak.com/channels/${this.channelId}/feeds.json?api_key=${this.apiKey}&minutes=${this.numberOfMinutes}`;
  
  private numberOfResults = 60;
  private feedUrlLastResults = `https://api.thingspeak.com/channels/${this.channelId}/feeds.json?api_key=${this.apiKey}&results=${this.numberOfResults}`;

  private startToEnd = `start=2024-05-04%2010:10:00&end=2024-05-04%2011:00`;
  private feedUrlTime = `https://api.thingspeak.com/channels/${this.channelId}/feeds.json?api_key=${this.apiKey}&${this.startToEnd}`;


  //private feedUrl = this.feedUrlTime;
  //private feedUrl = this.feedUrlLastMinutes;
  private feedUrl = this.feedUrlLastResults;

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
      //tap(_ => console.log(`read feed`)),
      map((res: IFeedResponse) => {
        return new FeedResponse(res as IFeedResponse)
      }),
      catchError(this.handleError<FeedResponse>('getFeed', {} as FeedResponse))
    );
  }

  sortFeedsFromLatest(feeds: Feed[]): Feed[] {
    return feeds.sort((item1: Feed, item2: Feed) => {
      return (item1.created_at > item2.created_at ? -1 : 1);
    });
  }
}
