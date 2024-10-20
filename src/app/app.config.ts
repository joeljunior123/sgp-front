import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './components/home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { FormProductComponent } from './components/form-product/form-product.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product', component: FormProductComponent },
  { path: 'product/:id', component: FormProductComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),]
};
