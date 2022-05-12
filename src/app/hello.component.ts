import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}! Age: {{age}}</h1>`,
  styles: [`h1 { font-family: Lato; background: red; }`],
})
export class HelloComponent {
  @Input() name: string;
  @Input() age: number;
}
