import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistTableComponent } from './component/page/checklist-table/checklist-table.component';
import {LoginComponent } from './component/page/login/login.component';
import { RegisterComponent } from './component/page/register/register.component';
import { SupportShiftComponent } from './component/page/grid-support/support-shift/support-shift.component';
import { MainComponent } from './component/page/main/main.component';
import { ProfileDetailComponent } from './component/page/profile-detail/profile-detail.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'checklist-table', component: ChecklistTableComponent },
  { path: 'support-shift', component: SupportShiftComponent },
  { path: 'profile-detail', component: ProfileDetailComponent },
  { path: 'main', component: MainComponent } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
