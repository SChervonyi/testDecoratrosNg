import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ParameterDecorator } from './exampleServices/parameterDecorator';
import { PropertyDecorator } from './exampleServices/propertyDecorator';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ParameterDecorator, PropertyDecorator],
  bootstrap: [AppComponent]
})
export class AppModule { }
