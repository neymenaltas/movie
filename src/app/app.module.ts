import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import {StoreModule} from "@ngrx/store";
import * as fromList from './shared/store/reducers/list.reducer';
import * as fromForm from './shared/store/reducers/form.reducer';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { MovieCardComponent } from './pages/list-page/movie-card/movie-card.component';
import {HttpClientModule} from "@angular/common/http";
import {fakeBackendProvider} from "./shared/fake-backend";
import {ListEffects} from "./shared/store/effects/list.effect";
import {EffectsModule} from "@ngrx/effects";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormEffects} from "./shared/store/effects/form.effect";
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import {ToastrModule} from "ngx-toastr";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MaterialModule} from "./shared/modules/material.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormPageComponent,
    ListPageComponent,
    MovieCardComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('list', fromList.reducer),
    StoreModule.forFeature('form', fromForm.reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 20
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(
      [ListEffects, FormEffects],
    ),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    InfiniteScrollModule,
    MaterialModule
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
