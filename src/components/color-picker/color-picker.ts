import { BaseComponent } from '../base-component';

export class ColorPicker extends BaseComponent<HTMLInputElement> {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'input', { class: 'color-picker', type: 'color', value: '#ffffff' });
  }
}
