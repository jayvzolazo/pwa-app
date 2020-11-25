import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebcamModule } from 'ngx-webcam';
import { NgxSignaturePadModule } from '@williamsrivas/ngx-signature-pad';

import { CameraProfilingRoutingModule } from './camera-profiling-routing.module';
import { CameraProfilingComponent } from './camera-profiling.component';

@NgModule({
  declarations: [CameraProfilingComponent],
  imports: [
    CommonModule,
    CameraProfilingRoutingModule,
    WebcamModule,
    NgxSignaturePadModule
  ]
})
export class CameraProfilingModule { }
