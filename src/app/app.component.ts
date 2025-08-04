import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { LoadingService } from './shared/loading-spinner/loading.service';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from './services/user.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationBellComponent } from "./features/notifications/notification-bell/notification-bell.component";
import { RouterLink } from '@angular/router';

declare var OneSignal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    RouterOutlet,
    LoadingSpinnerComponent,
    NotificationBellComponent,
    RouterLink,
    ]
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  private loadingService = inject(LoadingService);
  title = 'TaskManagementSystem';
  isLoading = toSignal(this.loadingService.isLoading$, { initialValue: false });

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && 'OneSignal' in window) {
      OneSignal = window['OneSignal'] || [];
      OneSignal.push(() => {
        OneSignal.init({
          appId: 'YOUR-ONESIGNAL-APP-ID',
          notifyButton: { enable: true },
          allowLocalhostAsSecureOrigin: true
        });

        OneSignal.on('subscriptionChange', (isSubscribed: boolean) => {
          if (isSubscribed) {
            OneSignal.getUserId().then((userId: string) => {
              // Send userId to backend to associate with logged-in user
              this.userService.registerOneSignalId(userId).subscribe();
            });
          }
        });
      });
    }
  }
}
