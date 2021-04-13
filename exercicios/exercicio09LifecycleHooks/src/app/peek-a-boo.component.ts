import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core'; // <-- não esqueça de incluir os imports

import { Component, Input } from '@angular/core';
import { LoggerService }    from './logger.service';

let nextId = 1; // <-- defina e inicialize a variável FORA da classe PeekABooComponent

@Component({
  selector: 'peek-a-boo',
  template: '<p>Now you see my hero, {{name}}</p>'
})
export class PeekABooComponent implements
             OnChanges, OnInit, DoCheck,
             AfterContentInit, AfterContentChecked,
             AfterViewInit, AfterViewChecked,
             OnDestroy { // <-- inclua as interfaces na assinatura da classe
  @Input()  name: string;

    private verb = 'initialized';

  constructor(private logger: LoggerService) {
    let is = this.name ? 'is' : 'is not';
    this.logIt(`name ${is} known at construction`);
  }

  logIt(msg: string) {
    this.logger.log(`#${nextId++} ${msg}`);
  }

  ngOnChanges(changes: SimpleChanges) {
    let changesMsgs: string[] = [];
    for (let propName in changes) {
      if (propName === 'name') {
        let name = changes['name'].currentValue;
        changesMsgs.push(`name ${this.verb} to "${name}"`);
      } else {
        changesMsgs.push(propName + ' ' + this.verb);
      }
    }
    this.logIt(`OnChanges: ${changesMsgs.join('; ')}`);
    this.verb = 'changed'; // next time it will be a change
  }

  ngOnInit() { this.logIt(`OnInit`); }

  ngDoCheck() { this.logIt(`DoCheck`); }

  ngAfterContentInit() { this.logIt(`AfterContentInit`);  }

  ngAfterContentChecked() { this.logIt(`AfterContentChecked`); }

  ngAfterViewInit() { this.logIt(`AfterViewInit`); }

  ngAfterViewChecked() { this.logIt(`AfterViewChecked`); }

  ngOnDestroy() { this.logIt(`OnDestroy`); }
}
