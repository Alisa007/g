import { BrowserModule } from '@angular/platform-browser';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FileDropModule } from 'ngx-file-drop';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatRadioModule,
  MatSelectModule,
  MatGridListModule,
  MatInputModule,
  MatIconModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { ErrorComponent } from './components/error/error.component';
import { FileDropComponent } from './components/fileDrop/fileDrop.component';
import { RadioComponent } from './components/radio/radio.component';
import { SelectComponent } from './components/select/select.component';

import { formReducer } from './reducers/form.reducer';
import {FormsModule} from '@angular/forms';

import { FormActions } from './actions/form.actions';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ErrorComponent,
    FileDropComponent,
    RadioComponent,
    SelectComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FileDropModule,
    NgxDnDModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatGridListModule,
    MatInputModule,
    NoopAnimationsModule,
    MatIconModule,

    StoreModule.forRoot({ form: formReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
  ],
  providers: [
    FormActions,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
