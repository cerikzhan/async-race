import { BaseComponent } from '../base-component';

export class Button extends BaseComponent<HTMLButtonElement> {
  onClick: () => void = () => {};

  constructor(parentNode: HTMLElement, cls: string, caption: string, isRender = true) {
    super(parentNode, 'button', { class: cls, type: 'button' }, caption, isRender);
    this.element.onclick = () => {
      if (this.onClick) {
        this.onClick();
      }
    };
  }

  disable(): void {
    this.element.classList.add('disabled');
  }

  activate(): void {
    this.element.classList.remove('disabled');
  }
}
