export interface CarObject {
  name: string;
  color: string;
  id?: number;
}

export interface CarStatus {
  velocity: number;
  distance: number;
}

export class CarModel {
  rootUrl: string;

  baseurl: string;

  headers: { 'Content-Type': string; };

  constructor() {
    this.rootUrl = 'http://localhost:3000';
    this.baseurl = 'http://localhost:3000/garage';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  getCars(page: number, limit: number): Promise<Response> {
    return fetch(`${this.baseurl}?_page=${page}&_limit=${limit}`, {
      method: 'GET',
      mode: 'cors',
      headers: this.headers,
    });
  }

  getCar<T>(id: number): Promise<T> {
    return fetch(`${this.baseurl}/${id}`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => res.json());
  }

  createCar<T>(data: CarObject): Promise<T> {
    return fetch(`${this.baseurl}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  deleteCar(id: number): Promise<Response> {
    return fetch(`${this.baseurl}/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }

  updateCar<T>(id: number, data: CarObject): Promise<T> {
    return fetch(`${this.baseurl}/${id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  startStopEngin<T>(id: number, status: string): Promise<T> {
    return fetch(`${this.rootUrl}/engine?id=${id}&status=${status}`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => res.json());
  }

  driveMode(id: number): Promise<number> {
    return fetch(`${this.rootUrl}/engine?id=${id}&status=drive`).then((res) => res.status);
  }
}
