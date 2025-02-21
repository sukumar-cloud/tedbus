import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Component/footer/footer.component';
import { DialogComponent } from './Component/landing-page/dialog/dialog.component';
import { LandingPageComponent } from './Component/landing-page/landing-page.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { PaymentPageComponent } from './Component/payment-page/payment-page.component';
import { MyTripComponent } from './Component/profile-page/my-trip/my-trip.component';
import { ProfilePageComponent } from './Component/profile-page/profile-page.component';
import { HeaderComponent } from './Component/selectbus-page/header/header.component';
import { LeftComponent } from './Component/selectbus-page/left/left.component';
import { BottomTabComponent } from './Component/selectbus-page/right/bus-book/bottom-tab/bottom-tab.component';
import { BusBookingFormComponent } from './Component/selectbus-page/right/bus-booking-form/bus-booking-form.component';
import { BusBoxComponent } from './Component/selectbus-page/right/bus-box/bus-box.component';
import { FormDrawerComponent } from './Component/selectbus-page/right/form-drawer/form-drawer.component';
import { RightComponent } from './Component/selectbus-page/right/right.component';
import { SmallSeatsComponent } from './Component/selectbus-page/right/small-seats/small-seats.component';
import { SortingBarComponent } from './Component/selectbus-page/right/sorting-bar/sorting-bar.component';
import { ViewSeatsComponent } from './Component/selectbus-page/right/view-seats/view-seats.component';
import { SelectbusPageComponent } from './Component/selectbus-page/selectbus-page.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        LandingPageComponent,
        DialogComponent,
        SelectbusPageComponent,
        HeaderComponent,
        LeftComponent,
        RightComponent,
        SortingBarComponent,
        BusBoxComponent,
        BottomTabComponent,
        ViewSeatsComponent,
        FormDrawerComponent,
        SmallSeatsComponent,
        BusBookingFormComponent,
        PaymentPageComponent,
        ProfilePageComponent,
        MyTripComponent
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        AppRoutingModule,
        MatMenuModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatTableModule,
        FormsModule,
        MatIconModule,
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireMessagingModule,
        MatSidenavModule,
        MatDividerModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })], providers: [provideNativeDateAdapter(), provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}