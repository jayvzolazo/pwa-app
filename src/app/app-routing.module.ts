import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'camera-profiling', loadChildren: './pages/camera-profiling/camera-profiling.module#CameraProfilingModule' },
  { path: 'home', loadChildren: './pages/home-page/home-page.module#HomePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
