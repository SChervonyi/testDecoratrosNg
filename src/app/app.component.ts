import { Component, OnInit } from '@angular/core';
import { ParameterDecorator } from './exampleServices/parameterDecorator';
import { PropertyDecorator } from './exampleServices/propertyDecorator';
import "reflect-metadata";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private parameterDecorator: ParameterDecorator, private propertyDecorator: PropertyDecorator) {  }

  ngOnInit(): void {
    this.propertyDecorator.runExample();
    // this.parameterDecorator.runExample();
  }
}
