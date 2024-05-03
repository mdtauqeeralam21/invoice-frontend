import { Component,HostListener  } from '@angular/core';
//import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'job-tracker-frontend';
  // constructor(private authService: AuthService) {}

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: Event) {
  //   this.authService.logout().subscribe(
  //     () => console.log('Logged out successfully'),
  //     error => console.error('Logout failed:', error)
  //   );
  // }

}
