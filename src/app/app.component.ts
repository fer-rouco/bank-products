import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrameworkModule } from './framework/framework.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FrameworkModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
