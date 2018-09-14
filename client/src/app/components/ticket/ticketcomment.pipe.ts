import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class TicketcommentPipe implements PipeTransform {

  transform(comments: Array<any>, conditions: {[field: string]: any}): Array<any> {
    return comments.filter(ticket => {
        for (const field in conditions) {
            if (ticket[field] !== conditions[field]) {
                return false;
            }
        }
        return true;
    });
}


}
