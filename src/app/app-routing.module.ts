import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormPageComponent} from "./pages/form-page/form-page.component";
import {ListPageComponent} from "./pages/list-page/list-page.component";

const routes: Routes = [
  { path: 'form', component: FormPageComponent },
  { path: 'form/:id', component: FormPageComponent },
  { path: 'list', component: ListPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
