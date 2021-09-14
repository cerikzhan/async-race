import './form.css';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { ColorPicker } from '../color-picker/color-picker';
import { Input } from '../input/input';
import { Track } from '../track/track';

export class Form extends BaseComponent<HTMLFormElement> {
  input: Input;

  colorPicker: ColorPicker;

  btn: Button;

  track: Track | undefined;

  constructor(parentNode: HTMLElement, cls: string, btnCaption: string) {
    super(parentNode, 'form', { class: cls });
    this.input = new Input(this.element);
    this.colorPicker = new ColorPicker(this.element);
    this.btn = new Button(this.element, 'btn btn-secondary', btnCaption);
  }

  reset(): void {
    this.input.element.value = '';
    this.colorPicker.element.value = '#ffffff';
  }
}
