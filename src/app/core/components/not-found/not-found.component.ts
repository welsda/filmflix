import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Images } from '../../models/images';
import { ImagesService } from '../../services/images/images.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  images$: Observable<Images[]>

  constructor(
    private imagesService: ImagesService
  ) {
    this.images$ = imagesService.showImages()
    .pipe(
      catchError(error => {
        return of([])
      })
    )
  }

  ngOnInit(): void {
  }

}
