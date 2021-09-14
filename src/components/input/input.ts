import { BaseComponent } from '../base-component';

export class Input extends BaseComponent<HTMLInputElement> {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'input', { class: 'input', type: 'text' });
  }
}
