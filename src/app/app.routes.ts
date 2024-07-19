import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { ListComponent } from './list/list.component';
import {SearchComponent} from './search/search.component'

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',  redirectTo: '/home', pathMatch: 'full'},
  { path: 'list', component: ListComponent },
  {path: 'search', component: SearchComponent},
  {path: '**', component: HomeComponent},
];
