import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, Observable, tap } from 'rxjs';

import { MovieTvBase } from '../core/models/movie-tv-base';
import { TmdbApiService } from './../core/services/tmdb-api/tmdb-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  trending$!: Observable<MovieTvBase[]>;
  results$?: Observable<MovieTvBase[]>;
  readonly PLACEHOLDER =
    'http://www.mdtop.com.br/wp-content/uploads/2021/01/placeholder-images-image_large.png'

  createImageLink(poster: string) {
    if (poster) {
      return `https://image.tmdb.org/t/p/w300/${poster}`;
    }

    return this.PLACEHOLDER;
  }

  @ViewChild('searchInput') searchImput!: ElementRef;

  constructor(private tmdbApi: TmdbApiService) {}

  ngAfterViewInit(): void {
    fromEvent(this.searchImput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean), //tira reesultados null, undefined etc
        debounceTime(300), //delay dado para só ser feita a pesquisa quando o usuário parar de digitar
        distinctUntilChanged(), //evita que valores emitidos sejam emitidos, precisam ser diferentes dos anteriores para emitir uma respota diferente
        tap(() => {
          const query = this.searchImput.nativeElement.value;
          console.log(query);
          if (query) {
            this.results$ = this.tmdbApi.search(query);
          }
          else {
            this.results$ = undefined;
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.trending$ = this.tmdbApi.trending();
  }

}
