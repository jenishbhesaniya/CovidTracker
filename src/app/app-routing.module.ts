import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccineLoginComponent } from './vaccine-login/vaccine-login.component';
import { AppComponent } from './app.component';
import { RootComponent } from './root/root.component';
import { StatesComponent } from './states/states.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {path:'',redirectTo:'/index',pathMatch:'full'},
  {path:'index',component:RootComponent},
  {path:'VaccineLogin', component:VaccineLoginComponent},
  {path:'',component:RootComponent},
  {path:'states', component:StatesComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
