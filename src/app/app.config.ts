import { Injectable } from '@angular/core';

@Injectable()
export class Config {
    public apiUrl = 'https://www.googleapis.com/youtube/v3/';
    public apiKey = 'AIzaSyAABomdr-TyJd-yHfrNTEmGwLkwD-R6P8E';
    public resultLimit = '10';

}
// https://www.googleapis.com/youtube/v3/search
// ?part=snippet&maxResults=25&q=surfing&key=AIzaSyAABomdr-TyJd-yHfrNTEmGwLkwD-R6P8E
