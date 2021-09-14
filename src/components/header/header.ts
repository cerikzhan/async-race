import { BaseComponent } from '../base-component';
import { Button } from '../button/button';

export class Header extends BaseComponent<HTMLElement> {
  toGarage: Button;

  toWinners: Button;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', { class: 'header' });
    this.toGarage = new Button(this.element, 'btn btn-primary mr', 'to garage');
    this.toWinners = new Button(this.element, 'btn btn-primary', 'to winners');
  }
}
