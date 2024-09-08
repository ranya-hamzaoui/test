import { NgModule, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Optional } from '@nestjs/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'Core is already loaded. Import it in the AppModule only'
      );
    }
  }
}


