import { Injectable, OnDestroy, ModuleWithProviders, NgModule } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class ScopedSubscription implements OnDestroy {
  private readonly subscription = new Subscription();

  on<T>(observable$: Observable<T>, observer: (it: T) => void): ScopedSubscription {
    this.subscription.add(observable$.subscribe(observer));
    return this;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

@NgModule()
export class ScopedSubscriptionModule {
  public static forRoot(): ModuleWithProviders<ScopedSubscriptionModule> {
    return {
      ngModule: ScopedSubscriptionModule,
      providers: [
        {
          provide: ScopedSubscription,
          useFactory: () => new ScopedSubscription(),
        },
      ],
    };
  }
}
