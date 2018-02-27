import { Injectable } from '@angular/core';

@Injectable()
export class PropertyDecorator {

  public runExample(): void {
    let greeter = new Greeter("Summer");
    console.log(greeter.greet());
  }
}

// ------------------------------------------------------------------------------------------------

const formatMetadataKey = Symbol("format");

function Format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
  @Format("Hello, %s") greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}
