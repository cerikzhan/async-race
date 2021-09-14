import { Track } from '../track/track';
import { Main } from '../main/main';
import { CarModel, CarObject, CarStatus } from '../../model/car-model';
import { WinnerModel, WinnerObj } from '../../model/winner-model';
import { generateCarName } from '../../utils';
import { BaseComponent } from '../base-component';

const LIMIT_PER_PAGE = 7;

export class Garage {
  main: Main;

  tracks: Track[] = [];

  model: CarModel;

  winnerModel: WinnerModel;

  carsAmount = 0;

  page = 1;

  winner: Track | null = null;

  message: BaseComponent<HTMLElement>;

  constructor(main: Main) {
    this.main = main;
    this.model = new CarModel();
    this.winnerModel = new WinnerModel();

    this.message = new BaseComponent(
      document.body,
      'p',
      { class: 'messege' },
      '',
    );

    this.renderGaragePage();
  }

  renderGaragePage(): void {
    this.main.element.innerHTML = '';
    this.main.title.element.innerText = `Garage (${this.carsAmount})`;

    this.main.renderGarage();
    this.main.control.createCarForm.btn.onClick = () => {
      this.createCarHandler();
    };
    this.main.control.updateCarForm.btn.onClick = () => {
      this.updateCarHandler();
    };
    this.main.control.raceBtn.onClick = () => {
      this.main.control.raceBtn.disable();
      this.main.control.resetBtn.activate();
      this.tracks.forEach((track) => {
        this.startRace(track, true);
      });
    };
    this.main.control.resetBtn.onClick = () => {
      this.main.control.raceBtn.activate();
      this.main.control.resetBtn.disable();
      this.tracks.forEach((track) => {
        this.resetRace(track);
      });
    };
    this.main.control.generateBtn.onClick = () => {
      this.generateHundredCars();
    };

    this.main.nextBtn.onClick = () => {
      this.page += 1;
      this.getCarsFromServer();
    };

    this.main.prevBtn.onClick = () => {
      this.page -= 1;
      this.getCarsFromServer();
    };

    this.getCarsFromServer();
  }

  async getCarsFromServer(): Promise<void> {
    this.main.trackWrapper.element.innerHTML = '';
    this.tracks = [];

    await this.model.getCars(this.page, LIMIT_PER_PAGE)
      .then((response) => {
        if (response.ok) {
          this.carsAmount = parseInt(response.headers.get('X-Total-Count') || '0', 10);
          return response.json();
        }

        throw new Error(response.statusText);
      })
      .then((data) => {
        const carsList = data as CarObject[];
        carsList.forEach((car) => {
          if (this.main.trackWrapper) {
            const track = new Track(this.main.trackWrapper.element, car);
            this.tracks.push(track);
            track.selectBtn.onClick = () => {
              this.selectCarHandler(track);
            };

            track.removeBtn.onClick = () => {
              this.removeCarHandler(track);
            };

            track.startBtn.onClick = () => {
              this.startRace(track, false);
            };

            track.stopBtn.onClick = () => {
              this.resetRace(track);
            };
          }
        });
      })
      .then(() => {
        this.main.control.raceBtn.activate();
        this.main.control.resetBtn.disable();
      });

    this.main.title.element.innerText = `Garage (${this.carsAmount})`;
    this.main.page.element.innerText = `Page #${this.page}`;

    if (this.page === 1) {
      this.main.prevBtn.disable();
    } else {
      this.main.prevBtn.activate();
    }

    if (this.carsAmount < LIMIT_PER_PAGE || Math.ceil(this.carsAmount / LIMIT_PER_PAGE) === this.page) {
      this.main.nextBtn.disable();
    } else {
      this.main.nextBtn.activate();
    }
  }

  createCarHandler(): void {
    const form = this.main.control.createCarForm;
    this.model.createCar<CarObject>({
      name: form.input.element.value,
      color: form.colorPicker.element.value,
    }).then(() => {
      form.reset();
      this.carsAmount += 1;
      this.main.title.element.innerText = `Garage (${this.carsAmount})`;
      this.getCarsFromServer();
    });
  }

  changeGarageTitle(): void {
    this.carsAmount += 1;
    this.main.title.element.innerText = `Garage (${this.carsAmount})`;
  }

  updateCarHandler(): void {
    const form = this.main.control.updateCarForm;
    const carId = form.input.element.dataset.carid;
    if (carId) {
      this.model.updateCar<CarObject>(
        parseInt(carId, 10),
        {
          name: form.input.element.value,
          color: form.colorPicker.element.value,
        },
      ).then((carObj) => {
        if (form.track) {
          form.track.carName.element.innerText = carObj.name;
          form.track.car.changeColor(carObj.color);
          form.reset();
          form.element.classList.add('disabled');
        }
      });
    }
  }

  selectCarHandler(track: Track): void {
    this.model.getCar<CarObject>(track.car.id).then((result) => {
      const form = this.main.control.updateCarForm;
      form.element.classList.remove('disabled');
      form.input.element.setAttribute('data-carid', `${track.car.id}`);
      form.input.element.value = result.name;
      form.colorPicker.element.value = result.color;
      form.track = track;
    });
  }

  removeCarHandler(track: Track): void {
    const carId = track.car.id;
    this.model.deleteCar(carId).then(() => {
      this.carsAmount -= 1;
      this.main.title.element.innerText = `Garage (${this.carsAmount})`;
    }).then(() => {
      this.winnerModel.delete(carId);
      this.getCarsFromServer();
    });
  }

  startRace(track: Track, race: boolean): void {
    this.winner = null;
    track.startBtn.disable();
    this.model.startStopEngin<CarStatus>(track.car.id, 'started')
      .then((res) => {
        track.stopBtn.activate();
        let driveMode = 200;
        this.model.driveMode(track.car.id).then((response) => {
          driveMode = response;
        });
        const startTime = new Date().getTime();
        const carAnimation = () => {
          const currTime = new Date().getTime();
          const d = track.flagImg.element.offsetLeft - 15;
          const time = (res.distance / res.velocity) / 1000;
          const newLeft = 45 + ((currTime - startTime) / 1000) * (d / time);
          track.car.element.style.left = `${newLeft}px`;
          if (newLeft < track.flagImg.element.offsetLeft + 25 && driveMode !== 500) {
            track.requestId = requestAnimationFrame(carAnimation);
          } else {
            if (!this.winner && driveMode === 200 && race) {
              this.winner = track;
              this.message.element.innerText = `${track.carName.element.innerText} [${time.toFixed(2)}]`;
              setTimeout(() => {
                this.message.element.innerText = '';
              }, 5000);
              this.createOrUpdateWinner(track, time);
            }
            this.model.startStopEngin(track.car.id, 'stopped').then(() => {
              cancelAnimationFrame(track.requestId);
            });
          }
        };
        carAnimation();
      });
  }

  resetRace(track: Track): void {
    this.message.element.innerText = '';
    this.model.startStopEngin(track.car.id, 'stopped').then(() => {
      track.stopBtn.disable();
      track.startBtn.activate();
      track.car.element.style.left = '45px';
      cancelAnimationFrame(track.requestId);
    });
  }

  async generateHundredCars(): Promise<void> {
    const result: Promise<CarObject>[] = [];
    for (let i = 0; i < 100; i++) {
      const carName = generateCarName(Math.ceil((Math.random() + 0.1) * 5));
      let randomNumber = Math.random();
      if (randomNumber < 0.2) {
        randomNumber = 1 - randomNumber;
      }
      const randomColor = Math.floor(randomNumber * 16777215).toString(16);
      result.push(this.model.createCar<CarObject>({ name: carName, color: `#${randomColor}` }));
    }
    result.forEach(() => this.changeGarageTitle());
    await Promise.all(result).then(() => {
      this.getCarsFromServer();
    });
  }

  async createOrUpdateWinner(track: Track, time: number): Promise<void> {
    const winner = await this.winnerModel.getWinner<WinnerObj>(track.car.id);
    if (winner.id) {
      const currTime = time < winner.time ? time : winner.time;
      this.winnerModel.update({ id: winner.id, wins: winner.wins + 1, time: currTime });
    } else {
      this.winnerModel.create({ id: track.car.id, wins: 1, time });
    }
  }
}
