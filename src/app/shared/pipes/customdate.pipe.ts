import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customdate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let ts = Date.now();

    let masodperce = Math.floor((ts-value)/1000)

    let value_date = new Date(value);

    if(masodperce < 60) return "Néhány másodperce."

    if(masodperce < 3600) return Math.floor(masodperce/60) + " perce.";

    if(masodperce < 86400) return Math.floor(masodperce/3600) + " órája.";

    if(masodperce < 2*86400) return "Egy napja."

    return value_date.getFullYear() + "-" + (value_date.getMonth()+1) + "-" + value_date.getDate() + " "
      + value_date.getHours() + ":" + value_date.getMinutes()+ ":" + value_date.getSeconds();
  }

}
