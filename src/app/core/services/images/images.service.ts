import { Images } from './../../models/images';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private readonly uriIMG='../../../../assets/images.json';

  constructor(private imagesUnfound: HttpClient) { }

  showImages() {
    return this.imagesUnfound.get<Images[]>(this.uriIMG)
    .pipe(
      first(),
      tap(showImg => console.log(showImg))
    )
  }
}
