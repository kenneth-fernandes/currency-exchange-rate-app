import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'queryFilter'
})
export class QueryFilterPipe implements PipeTransform {

  transform(values: any[], query: string): any {
    if (!values || !query) {
      return values;
    }
    return values.filter((item) => {
      console.log(item);
      return item.currency.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

}
