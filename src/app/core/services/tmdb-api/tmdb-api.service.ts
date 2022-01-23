import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  baseUrl = 'https://api.themoviedb.org/3/';

  options = {
    api_key: '03a310e94c3e55841742dfeee3aef8ed',
    language: 'pt-BR'
  }
  //em toda requisição feita serão enviadas essas informações.

  constructor() { }
}
