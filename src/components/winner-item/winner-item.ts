import './winner-item.css';
import { BaseComponent } from '../base-component';
import { Car } from '../car/car';

export class WinnerItem extends BaseComponent<HTMLTableRowElement> {
  positionCell: BaseComponent<HTMLTableCellElement>;

  carCell: BaseComponent<HTMLTableCellElement>;

  carName: BaseComponent<HTMLTableCellElement>;

  winsCell: BaseComponent<HTMLTableCellElement>;

  timeCell: BaseComponent<HTMLTableCellElement>;

  constructor(
    parentNode: HTMLElement,
    position: string,
    color: string,
    carName: string,
    carId: number,
    wins: number,
    time: number,
  ) {
    super(parentNode, 'tr', { class: 'winner-item' });
    this.positionCell = new BaseComponent(this.element, 'td', { class: 'position' }, `${position}`);
    const carImage = new Car(carId, color);
    this.carCell = new BaseComponent(this.element, 'td', { class: 'car-image' });
    this.carCell.element.appendChild(carImage.element);
    this.carName = new BaseComponent(this.element, 'td', { class: 'car-name' }, carName);
    this.winsCell = new BaseComponent(this.element, 'td', { class: 'wins-number' }, `${wins}`);
    this.timeCell = new BaseComponent(this.element, 'td', { class: 'best-time' }, `${time.toFixed(2)}`);
  }
}
