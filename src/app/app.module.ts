import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChecklistTableComponent } from './component/page/checklist-table/checklist-table.component';
import { LoginComponent } from './component/page/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { AuthService } from './component/service/auth.service';
import { RegisterComponent } from './component/page/register/register.component';
import { SupportShiftComponent } from './component/page/grid-support/support-shift/support-shift.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ShiftService } from './component/service/shift.service';
import { DashboardService } from './component/service/dashboard.service';
import { DataService } from './component/service/data.service';
import { MenubarComponent } from './component/page/menubar/menubar.component';
import { MainComponent } from './component/page/main/main.component';
import { ProfileDetailComponent } from './component/page/profile-detail/profile-detail.component';




@NgModule({
  declarations: [
    AppComponent,
    ChecklistTableComponent,
    LoginComponent,
    RegisterComponent,
    SupportShiftComponent,
        MenubarComponent,
    MainComponent,
    ProfileDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatListModule,
    HttpClientModule,
    MatRadioModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatTableModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  providers: [
    ShiftService,
    DashboardService,
    DataService,
    DatePipe,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
