export class Car {
  element: SVGSVGElement;

  id: number;

  rightWheel: SVGPathElement;

  leftWheel: SVGPathElement;

  body: SVGPathElement;

  constructor(id: number, color: string) {
    this.id = id;
    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.element.classList.add('car-icon');
    this.element.setAttribute('viewBox', '0 0 512 512');
    this.element.setAttribute('width', '512');
    this.element.setAttribute('height', '512');

    this.rightWheel = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.rightWheel.setAttribute('fill', color);
    this.rightWheel.setAttribute(
      'd',
      'M416,228a44,44,0,1,0,44,44A44.049,44.049,0,0,0,416,228Zm0,64a20,20,0,1,1,20-20A20.023,20.023,0,0,1,416,292Z',
    );
    this.element.appendChild(this.rightWheel);

    this.leftWheel = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.leftWheel.setAttribute('fill', color);
    this.leftWheel.setAttribute(
      'd',
      'M112,228a44,44,0,1,0,44,44A44.049,44.049,0,0,0,112,228Zm0,64a20,20,0,1,1,20-20A20.023,20.023,0,0,1,112,292Z',
    );
    this.element.appendChild(this.leftWheel);
    this.body = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.body.setAttribute(
      'd',
      // eslint-disable-next-line max-len
      'M506.4,250.009C505.127,247.8,474.607,196,416,196c-56.626,0-86.215-12.689-90.065-14.46C319.378,177.257,273.36,148,240,148H144c-32.395,0-76.725,27.588-85.268,33.107L12.205,196.616A12,12,0,0,0,4,208v64a12,12,0,0,0,9.646,11.767l46.48,9.3A56,56,0,1,1,160.466,300H367.534a56,56,0,1,1,96.932,0H496a12,12,0,0,0,12-12V256A12.011,12.011,0,0,0,506.4,250.009ZM240,268H192a12,12,0,0,1,0-24h48a12,12,0,0,1,0,24Zm48,0a12,12,0,1,1,12-12A12,12,0,0,1,288,268Zm5.367-69.267A12.006,12.006,0,0,1,288,200H192a12,12,0,0,1-3.795-.616C187.61,199.187,141.6,184,112,184H73.937c17.944-10.044,47.022-24,70.063-24h96c25.8,0,59.178,17.5,76.007,27.413ZM336,268a12,12,0,1,1,12-12A12,12,0,0,1,336,268Z',
    );
    this.body.setAttribute('fill', color);
    this.element.appendChild(this.body);
  }

  changeColor(color: string): void {
    this.leftWheel.style.fill = color;
    this.rightWheel.style.fill = color;
    this.body.style.fill = color;
  }
}
