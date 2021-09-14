import './main.css';
import { CarModel } from '../../model/car-model';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { GarageControlSection } from '../garage-control/control';
import { Title } from '../title/title';

export class Main extends BaseComponent<HTMLElement> {
  trackWrapper: BaseComponent<HTMLElement>;

  model: CarModel;

  control: GarageControlSection;

  title: Title;

  page: Title;

  prevBtn: Button;

  nextBtn: Button;

  winnersWrapper: BaseComponent<HTMLTableElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', { class: 'main' });
    this.control = new GarageControlSection(this.element);
    this.title = new Title(this.element, 'h1', 'title main-title', '', false);
    this.page = new Title(this.element, 'h2', 'title', '', false);
    this.trackWrapper = new BaseComponent(this.element, 'div', { class: 'track-wrapper' }, undefined, false);
    this.prevBtn = new Button(this.element, 'btn btn-primary mr', 'previous', false);
    this.nextBtn = new Button(this.element, 'btn btn-primary', 'next', false);

    this.winnersWrapper = new BaseComponent<HTMLTableElement>(this.element, 'table', { class: 'winners-wrapper' });

    this.model = new CarModel();
  }

  renderGarage(): void {
    this.control.render();
    this.title.render();
    this.page.render();
    this.trackWrapper.render();
    this.prevBtn.render();
    this.nextBtn.render();
  }

  renderWinners(): void {
    this.title.render();
    this.page.render();
    this.winnersWrapper.render();
    this.prevBtn.render();
    this.nextBtn.render();
  }
}
