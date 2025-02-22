import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotComponent } from './Component/chatbot/chatbot.component';
import { LandingPageComponent } from './Component/landing-page/landing-page.component';
import { PaymentPageComponent } from './Component/payment-page/payment-page.component';
import { ProfilePageComponent } from './Component/profile-page/profile-page.component';
import { SelectbusPageComponent } from './Component/selectbus-page/selectbus-page.component';
const routes: Routes = [
  {path: '',component:LandingPageComponent},
  {path: 'select-bus',component:SelectbusPageComponent},
  {path:'payment',component:PaymentPageComponent},
  {path:'profile',component:ProfilePageComponent},
  { path: 'chatbot', component: ChatbotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
