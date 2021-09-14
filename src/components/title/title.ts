import { BaseComponent } from '../base-component';

export class Title extends BaseComponent<HTMLTitleElement> {
  constructor(parentNode: HTMLElement, tag: string, className: string, text: string, isRender = true) {
    super(parentNode, tag, { class: className }, text, isRender);
  }
}
