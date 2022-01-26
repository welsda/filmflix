import { TvDetailComponent } from './tv-detail/tv-detail.component';
import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ProfileComponent } from './profile/profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login'])

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'movie/:id', //: indica rota dinâmica, será gerada de acordo com o id que for carregado pelos métodos
    component: MovieDetailComponent
  },
  {
    path: 'tv/:id', //: indica rota dinâmica, será gerada de acordo com o id que for carregado pelos métodos
    component: TvDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

//Chave da API: 03a310e94c3e55841742dfeee3aef8ed
