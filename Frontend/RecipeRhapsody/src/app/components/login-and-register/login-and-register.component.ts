import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-and-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-and-register.component.html',
  styleUrl: './login-and-register.component.css'
})
export class LoginAndRegisterComponent {

  isActive: boolean = true;

}
