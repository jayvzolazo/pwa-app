import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraProfilingComponent } from './camera-profiling.component';

const routes: Routes = [
  { path: '', component: CameraProfilingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraProfilingRoutingModule { }
