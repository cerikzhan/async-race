export interface WinnerObj {
  id: number;
  wins: number;
  time: number;
}

export class WinnerModel {
  baseurl: string;

  headers: { 'Content-Type': string; };

  constructor() {
    this.baseurl = 'http://localhost:3000/winners';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  getWinners(page = 1, limit = 10, sort = 'id', order = 'ASC'): Promise<Response> {
    const params = `?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    return fetch(`${this.baseurl}/${params}`, {
      method: 'GET',
      mode: 'cors',
      headers: this.headers,
    });
  }

  getWinner<T>(id: number): Promise<T> {
    return fetch(`${this.baseurl}/${id}`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => res.json());
  }

  create<T>(data: WinnerObj): Promise<T> {
    return fetch(this.baseurl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  update<T>(data: WinnerObj): Promise<T> {
    return fetch(`${this.baseurl}/${data.id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  delete(id: number): Promise<Response> {
    return fetch(`${this.baseurl}/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }
}
