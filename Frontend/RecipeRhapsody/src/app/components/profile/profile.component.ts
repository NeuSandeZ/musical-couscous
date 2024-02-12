import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(
    private readonly _router: Router,
    private readonly _activeRoute: ActivatedRoute
  ) {}

  navigate(navigateTo: string) {
    this._router.navigate([navigateTo], {
      relativeTo: this._activeRoute,
    });
  }
}
