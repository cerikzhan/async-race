export class BaseComponent<T extends HTMLElement> {
  readonly element: T;

  parentNode: HTMLElement;

  constructor(
    parentNode: HTMLElement,
    tag: string,
    attributes: { [prop: string]: string },
    innerText?: string,
    isRender = true,
  ) {
    this.element = <T>document.createElement(tag);
    this.parentNode = parentNode;
    const keys = Object.keys(attributes);
    for (let i = 0; i < keys.length; i++) {
      const attr = keys[i];
      this.element.setAttribute(attr, attributes[attr]);
    }
    if (innerText) {
      this.element.appendChild(document.createTextNode(innerText));
    }

    if (isRender) {
      this.render();
    }
  }

  render(): void {
    this.parentNode.appendChild(this.element);
  }
}
