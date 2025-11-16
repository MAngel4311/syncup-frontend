import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="success-container">
      <div class="loading-spinner"></div>
      <p>Iniciando sesión con Google...</p>
    </div>
  `,
  styles: [
    `
      .success-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #0a0a0a;
        color: #ffffff;
      }
      .loading-spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top: 4px solid #ffffff;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoginSuccessComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: Auth
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    const name = this.route.snapshot.queryParamMap.get('name');

    if (token && name) {
      const decodedName = decodeURIComponent(name);
      this.authService.saveToken(token, decodedName);
      this.router.navigate(['/dashboard']);
    } else {
      console.error("No se recibió el token o el nombre del backend.");
      this.router.navigate(['/login']);
    }
  }
}