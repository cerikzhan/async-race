const carNames = [
  'acura', 'alfa romeo', 'alga', 'aston martin', 'audi', 'bmw',
  'bentley', 'cadillac', 'chevrolet', 'chrysler', 'daewoo',
  'ferrari', 'fiat', 'ford', 'geely', 'honda', 'hyundai', 'infiniti',
  'isuzu', 'jaguar', 'jeep', 'kia', 'lamborghini', 'land rover', 'lexus',
  'maserati', 'mazda', 'mercedes benz', 'mitsubishi', 'nissan', 'opel',
  'porsche', 'renault', 'saab', 'seat', 'skoda', 'subaru', 'suzuki',
  'tesla', 'toyota', 'volkswagen', 'volvo', 'lada',
];

export function generateCarName(len: number): string {
  const brand = carNames.sort(() => Math.random() - 0.5)[Math.floor(Math.random() * carNames.length)];
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const model = [];
  for (let i = 0; i < len; i++) {
    model.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return `${brand} ${model.join('')}`;
}
