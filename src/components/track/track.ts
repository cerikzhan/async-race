import './track.css';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import flag from '../../assets/icons/flag.svg';
import { Car } from '../car/car';
import { CarModel, CarObject } from '../../model/car-model';

export class Track extends BaseComponent<HTMLElement> {
  car: Car;

  selectBtn: Button;

  model: CarModel = new CarModel();

  carName: BaseComponent<HTMLElement>;

  removeBtn: Button;

  startBtn: Button;

  stopBtn: Button;

  flagImg: BaseComponent<HTMLElement>;

  requestId = NaN;

  constructor(parentNode: HTMLElement, carObj: CarObject, isRender = true) {
    super(parentNode, 'div', { class: 'track' }, undefined, isRender);
    if (!carObj.id) throw new Error('Car id required!');
    this.car = new Car(carObj.id, carObj.color);

    const trackHeader = new BaseComponent(this.element, 'div', { class: 'track-header' });
    this.selectBtn = new Button(trackHeader.element, 'btn btn-secondary', 'select');

    this.removeBtn = new Button(trackHeader.element, 'btn btn-secondary', 'remove');

    this.carName = new BaseComponent(trackHeader.element, 'p', { class: 'car-name' }, carObj.name);
    const trackBody = new BaseComponent(this.element, 'div', { class: 'track-body' });
    this.startBtn = new Button(trackBody.element, 'btn btn-outline', 'a');
    this.stopBtn = new Button(trackBody.element, 'btn btn-outline btn-danger disabled', 'b');
    trackBody.element.appendChild(this.car.element);
    this.flagImg = new BaseComponent(trackBody.element, 'img', { class: 'flag', src: flag });
  }
}
