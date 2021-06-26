import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatCardModule} from '@angular/material/card';
import { AlldataComponent } from './alldata/alldata.component';
import { MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CaraSouleComponent } from './cara-soule/cara-soule.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { InformationComponent } from './information/information.component';
import { VaccineLoginComponent } from './vaccine-login/vaccine-login.component';
import { RootComponent } from './root/root.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StatesComponent } from './states/states.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { SymptomsComponent } from './symptoms/symptoms.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DetailComponent } from './detail/detail.component';
import {MatChipsModule} from '@angular/material/chips';
import { ChipsMultiSelectComponent } from './detail/chips-multi-select/chips-multi-select.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlldataComponent,
    CaraSouleComponent,
    FooterComponent,
    InformationComponent,
    VaccineLoginComponent,
    RootComponent,
    StatesComponent,
    SymptomsComponent,
    DetailComponent,
    ChipsMultiSelectComponent,

  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatButtonModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    HttpClientModule,
    MatSliderModule,
    NgbModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// npm install ngx-pagination
