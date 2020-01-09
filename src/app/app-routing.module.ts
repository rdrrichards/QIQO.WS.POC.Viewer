import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'viewer', pathMatch: 'full' },
  { path: 'viewer', loadChildren: () => import('./viewer/viewer.module').then(m => m.ViewerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
