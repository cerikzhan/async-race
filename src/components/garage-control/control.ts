import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { Form } from '../form/form';

export class GarageControlSection extends BaseComponent<HTMLElement> {
  createCarForm: Form;

  updateCarForm: Form;

  raceBtn: Button;

  resetBtn: Button;

  generateBtn: Button;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', { class: 'page-control' }, undefined, false);

    this.createCarForm = new Form(this.element, 'garage-form', 'create');

    this.updateCarForm = new Form(this.element, 'garage-form disabled', 'update');

    const buttonGroup = new BaseComponent(this.element, 'div', { class: 'button-group' });
    this.raceBtn = new Button(buttonGroup.element, 'btn btn-primary', 'race');
    this.resetBtn = new Button(buttonGroup.element, 'btn btn-primary disabled', 'reset');
    this.generateBtn = new Button(buttonGroup.element, 'btn btn-secondary', 'generate cars');
  }
}
