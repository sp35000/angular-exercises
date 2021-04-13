import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { PeekABooParentComponent } from './peek-a-boo-parent.component'; // <-- importe o símbolo PeekABooComponent
import { PeekABooComponent } from './peek-a-boo.component'; // <-- importe o símbolo PeekABooComponent

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
