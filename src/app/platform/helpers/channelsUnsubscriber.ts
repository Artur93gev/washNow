import { Subscription } from 'rxjs/Rx';

export default (list: Array<Subscription>): void => {
  list.forEach((item: Subscription) => {
    item.unsubscribe();
  });
}
