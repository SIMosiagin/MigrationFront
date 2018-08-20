import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {DownloadComponent} from "./DownloadExcel/DownloadExcel.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatInputModule, MatTableModule, MatToolbarModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { AddSkillGroupComponent } from './add-skill-group/add-skill-group.component';
import { TransitTableComponent } from './transit-table/transit-table.component';
import { AddValidationComponent } from './add-validation/add-validation.component';
import { AddManualValidDataComponent } from './add-manual-valid-data/add-manual-valid-data.component';



const routes =[
  //  {path: '', component: AppComponent},
  {path: 'downloadExcel', component: DownloadComponent},

]


@NgModule({
  declarations: [
    AppComponent,
    DownloadComponent,
    AddSkillComponent,
    AddSkillGroupComponent,
    TransitTableComponent,
    AddValidationComponent,
    AddManualValidDataComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  exports:[
    [CommonModule,
      MatToolbarModule,
      MatInputModule,
      MatTableModule]

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
