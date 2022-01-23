import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  constructor(private storage: Storage) {}

  private createFileName(f: File) {
    const ext = f.name.split('.').pop(); //pegar extensão
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`
    //para reduzir chances de gerar arquivos iguais
    return `${name}.${ext}`;
  }

  upload(image: File, folder: string = 'users/') {//no drive vai haver esse arquivo
    const filename = this.createFileName(image);
    const profile = ref(this.storage, folder + filename);
    //ref é a referência no drive, com pasta e nome do arquivo com extensão
    return from(uploadBytes(profile, image)).pipe(//quando faz o upload da imagem no storage
      switchMap((_) => {
        return from(getDownloadURL(profile));
      }) //inicia um novo observable, dando um url para baixar a imagem
    )
  }
}
