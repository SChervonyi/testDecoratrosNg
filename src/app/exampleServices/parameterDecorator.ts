import { Injectable } from '@angular/core';

@Injectable()
export class ParameterDecorator {
  public runExample(): void {
    let person = new Person("Rick");
    console.log(person.greet("Morti"));
  }
}

// ------------------------------------------------------------------------------------------------

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

export class Person {
  private greeter: string;
  public name: string = "ches";

  constructor(greeter: string) {
    this.greeter = greeter;
  }

  @Validate
  greet(@Required name: any) {
    return "Hello " + name + ", I am " + this.greeter;
  }
}
