import { Injectable, InjectionToken, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, of } from 'rxjs';
import { User } from '../interfaces/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'window local storage object',
  {
    providedIn: 'root',
    factory: () => {
      return inject(PLATFORM_ID) === 'browser'
        ? window.localStorage
        : ({} as Storage);
    },
  }
);

export type AuthUser = User | null;

interface AuthState {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storage = inject(LOCAL_STORAGE);

  // State

  private state = signal<AuthState>({
    user: null,
  })

  private userLoaded$ = this.loadUser().pipe(
    catchError((err) => {
        return EMPTY;
    })
  )

  // Selectors

  user = computed(() => this.state().user);

  constructor() {
    this.userLoaded$.pipe(takeUntilDestroyed()).subscribe((user) =>
        this.state.update((state) => ({ ...state, user }))
    )
  }
  
  loadUser() {
    this.uploadUserToStorage();
    const user = this.storage.getItem('user');
    return of(user ? (JSON.parse(user) as User) : null);
  }

  uploadUserToStorage() {
    this.storage.setItem('user', JSON.stringify(
      {
        "id": "1",
        "name": "Anton",
        "displayName": "Anton Yakovenko",
        "addressLine": "Ivana Boguna 68",
        "postalCode": "73033",
        "city": "Kherson",
        "countryCode": "+380",
        "phoneNumber": "0505346388",
        "mail": 'example@gmail.com',
        "password": 'qwerty',
        "role": 'CUSTOMER'
      }
    ))
  }
}