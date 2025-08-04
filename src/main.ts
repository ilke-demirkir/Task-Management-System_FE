import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Register custom service worker for push notifications (in production only)
const isProd = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
if ('serviceWorker' in navigator && isProd) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/custom-service-worker.js')
      .then(reg => console.log('Custom service worker registered:', reg))
      .catch(err => console.error('Service worker registration failed:', err));
  });
}
