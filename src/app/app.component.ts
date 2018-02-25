import { Component, OnInit } from '@angular/core';
import "reflect-metadata";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    // let person = new Person("Rick");
    // console.log(person.greet(undefined));

    // let greeter = new Greeter("Summer");
    // console.log(greeter.greet());
  }
}

// ----------------------------------------------------------------------------------------------------------------------------------

// const formatMetadataKey = Symbol("format");

// function Format(formatString: string) {
//     return Reflect.metadata(formatMetadataKey, formatString);
// }

// function getFormat(target: any, propertyKey: string) {
//     return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
// }

// class Greeter {
//   @Format("Hello, %s") greeting: string;

//   constructor(message: string) {
//       this.greeting = message;
//   }

//   greet() {
//       let formatString = getFormat(this, "greeting");
//       return formatString.replace("%s", this.greeting);
//   }
// }

// ----------------------------------------------------------------------------------------------------------------------------------

const requiredMetadataKey = Symbol("required");

function Required(target: Object, propertyKey: string | symbol, parameterIndex: number): void {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function Validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>): void {
  let method = descriptor.value;
  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error("Missing required argument.");
        }
      }
    }

    return method.apply(this, arguments);
  }
}

class Person {
  private greeter: string;

  constructor(greeter: string) {
    this.greeter = greeter;
  }

  @Validate
  greet(@Required name: any) {
    return "Hello " + name + ", I am " + this.greeter;
  }
}
