import { Garage } from './components/garage/garage-page';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { Winners } from './components/winners/winners-page';

export class App {
  header: Header;

  main: Main;

  garage: Garage;

  winners: Winners;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header(rootElement);
    this.main = new Main(rootElement);
    this.garage = new Garage(this.main);
    this.winners = new Winners(this.main);

    this.header.toGarage.onClick = () => {
      this.garage.renderGaragePage();
    };

    this.header.toWinners.onClick = () => {
      this.winners.renderWinnersPage();
    };
  }
}
