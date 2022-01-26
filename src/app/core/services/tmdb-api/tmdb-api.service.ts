import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { MovieTvBase } from './../../models/movie-tv-base';

type ApiResponse = { page: number; results: MovieTvBase[] };

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  baseUrl = 'https://api.themoviedb.org/3';

  options = {
    api_key: '03a310e94c3e55841742dfeee3aef8ed',
    language: 'pt-BR'
  }
  //em toda requisição feita serão enviadas essas informações.

  constructor(private http: HttpClient) {}

  trending(): Observable<MovieTvBase[]> {
    return this.http
      .get<ApiResponse>(`${this.baseUrl}/trending/all/week`, {
        params: this.options,
      })
      .pipe(map(data => data.results)); //procura dentro do array apenas a propriedade results, que contém um array que vai ser tipado
  }

  search(query: string): Observable<MovieTvBase[]> {
    return this.http
      .get<ApiResponse>(`${this.baseUrl}/search/multi`, {
        params: {
          ...this.options,
          include_adult: false, //funciona como um filtro para não retornar filmes adultos
          query: query,
        },
      })
      .pipe(map((data) => data.results));
  }

  getDetailById(id: number, type: 'movie' | 'tv'): Observable<MovieTvBase> {
    return this.http.get<MovieTvBase>(`${this.baseUrl}/${type}/${id}`, {
      params: this.options,
    });
  }
}
