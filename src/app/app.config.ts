import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'favoribooksfire',
        appId: '1:712470063277:web:bc740af758e37d07c53e24',
        storageBucket: 'favoribooksfire.firebasestorage.app',
        apiKey: 'AIzaSyCTXFpIpXNZE4XBLfmJbeOMTxIa35m2jlk',
        authDomain: 'favoribooksfire.firebaseapp.com',
        messagingSenderId: '712470063277',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
