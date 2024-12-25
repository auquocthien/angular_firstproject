import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUppercase',
})
export class FirstLetterUppercasePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value.at(0)?.toUpperCase() + value.slice(1);
  }
}
