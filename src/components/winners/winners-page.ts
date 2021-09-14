import { CarModel, CarObject } from '../../model/car-model';
import { WinnerModel } from '../../model/winner-model';
import { BaseComponent } from '../base-component';
import { Main } from '../main/main';
import { WinnerItem } from '../winner-item/winner-item';

const LIMIT_PER_PAGE = 10;

export class Winners {
  main: Main;

  winnerModel: WinnerModel;

  carModel: CarModel;

  page = 1;

  tabelHeader: BaseComponent<HTMLElement>;

  request = {
    sort: 'id', order: 'ASC',
  };

  sortByWins = { sort: 'wins', order: 'ASC' };

  sortByTime = { sort: 'time', order: 'ASC' };

  winnerTotal = 0;

  winsHeader: BaseComponent<HTMLElement>;

  timeHeader: BaseComponent<HTMLElement>;

  constructor(main: Main) {
    this.main = main;
    this.winnerModel = new WinnerModel();
    this.carModel = new CarModel();
    this.main.title.element.innerText = `Winners (${this.winnerTotal})`;
    this.main.page.element.innerText = `Page #${this.page}`;
    this.tabelHeader = new BaseComponent(
      this.main.winnersWrapper.element,
      'tr',
      { class: 'table-header' },
      undefined,
      false,
    );
    const numberHeader = new BaseComponent(this.tabelHeader.element, 'th', { class: 'header-title' }, '#');
    const carHeader = new BaseComponent(this.tabelHeader.element, 'th', { class: 'header-title' }, 'Car');
    const nameHeader = new BaseComponent(this.tabelHeader.element, 'th', { class: 'header-title' }, 'Name');
    this.winsHeader = new BaseComponent(this.tabelHeader.element, 'th', { class: 'header-title' }, 'Wins');
    this.timeHeader = new BaseComponent(this.tabelHeader.element, 'th', { class: 'header-title' }, 'Time (seconds)');
  }

  renderWinnersPage(): void {
    this.main.element.innerHTML = '';
    this.main.renderWinners();

    this.main.title.element.innerText = `Winners (${this.winnerTotal})`;
    this.main.page.element.innerText = `Page #${this.page}`;

    this.winsHeader.element.onclick = () => {
      this.timeHeader.element.className = 'header-title';
      this.request.sort = this.sortByWins.sort;
      this.request.order = this.sortByWins.order;
      this.getWinnersFromServer();
      if (this.sortByWins.order === 'ASC') {
        this.winsHeader.element.classList.remove('sort-desc');
        this.winsHeader.element.classList.add('sort-asc');
        this.sortByWins.order = 'DESC';
      } else {
        this.winsHeader.element.classList.remove('sort-asc');
        this.winsHeader.element.classList.add('sort-desc');
        this.sortByWins.order = 'ASC';
      }
    };

    this.timeHeader.element.onclick = () => {
      this.winsHeader.element.className = 'header-title';
      this.request.sort = this.sortByTime.sort;
      this.request.order = this.sortByTime.order;
      this.getWinnersFromServer();
      if (this.sortByTime.order === 'ASC') {
        this.timeHeader.element.classList.remove('sort-desc');
        this.timeHeader.element.classList.add('sort-asc');
        this.sortByTime.order = 'DESC';
      } else {
        this.timeHeader.element.classList.remove('sort-asc');
        this.timeHeader.element.classList.add('sort-desc');
        this.sortByTime.order = 'ASC';
      }
    };

    this.main.nextBtn.onClick = () => {
      this.page += 1;
      this.getWinnersFromServer();
    };

    this.main.prevBtn.onClick = () => {
      this.page -= 1;
      this.getWinnersFromServer();
    };

    this.getWinnersFromServer();
  }

  async getWinnersFromServer(): Promise<void> {
    this.main.winnersWrapper.element.innerHTML = '';

    this.tabelHeader.render();

    const winners = await this.winnerModel.getWinners(
      this.page,
      LIMIT_PER_PAGE,
      this.request.sort,
      this.request.order,
    ).then((response) => {
      if (response.ok) {
        this.winnerTotal = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        return response.json();
      }

      throw new Error(response.statusText);
    });

    const winnersList: Promise<CarObject>[] = [];
    for (let i = 0; i < winners.length; i++) {
      winnersList.push(this.carModel.getCar<CarObject>(winners[i].id));
    }

    this.main.title.element.innerText = `Winners (${this.winnerTotal})`;
    this.main.page.element.innerText = `Page #${this.page}`;

    await Promise.all(winnersList).then((carList) => carList.forEach((car, index) => {
      const winnerItem = new WinnerItem(
        this.main.winnersWrapper.element,
        `${(index + 1) + (this.page - 1) * 10}`,
        car.color,
        car.name,
        car.id ? car.id : 1,
        winners[index].wins,
        winners[index].time,
      );
    }));

    if (this.page === 1) {
      this.main.prevBtn.disable();
    } else {
      this.main.prevBtn.activate();
    }

    if (this.winnerTotal < LIMIT_PER_PAGE || Math.ceil(this.winnerTotal / LIMIT_PER_PAGE) === this.page) {
      this.main.nextBtn.disable();
    } else {
      this.main.nextBtn.activate();
    }
  }
}
