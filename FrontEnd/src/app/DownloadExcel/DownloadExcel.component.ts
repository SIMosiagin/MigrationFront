import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Router} from "@angular/router";
import {DownloadService} from "./Download.service";
import {FormsModule} from '@angular/forms';
import {forEach} from "@angular/router/src/utils/collection";





@Component({
  selector: 'app-download',
  templateUrl: './downloadexcel.component.html',
  providers: [DownloadService],
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {

  condition: boolean = true;
  mappeingTag: boolean = true;
  mapFields: boolean = true;
  valid:boolean = true;
  notDone: boolean = true;


  markRowSkillsRed: boolean;


  pathForReport: string;
  fields ;
  mainValidation = [];
  manualValidation = [];
  fieldsWithValid = [];
  valType = [];



  markOnTTable = false;

  skillname:string;


  selectedSheet:string;
  transinTable;
  selectedFile: File = null;
  sheets = [];
  mappingColumns;
  skillGroup;
  transitTables;

  mappingFields;


  setSkillGroup(skillgroup:Array<Object>){
    this.skillGroup = skillgroup;
  }


  setDescription(index:any, skill:object){
   // this.mappingColumns[index] = skill;
    this.http.post('http://localhost:8082/setOrUpdateSkill', this.mappingColumns[index][3]).subscribe(res =>{
      this.mappingColumns[index][3] = res;
    });
    for (let map in this.mappingColumns){
      if (this.mappingColumns[map][2] == this.mappingColumns[index][3].skillGroup.name ){
        this.mappingColumns[map][3].skillGroup.description = skill[3].skillGroup.description;
      }
    }
  }

  revomeSkill(map){
    this.mappingColumns = this.mappingColumns.filter(MC => MC != map);
    let newIndex: number = 0;
    for (let map in this.mappingColumns){
        this.mappingColumns[map][0] = newIndex;
        newIndex = newIndex +1;
    }
  }

  setInToFieldsWithValid(sheetName:string, fieldName: string, val:string, valType: string){
    this.fieldsWithValid.push({table:this.transinTable,
      field:fieldName,
      validation: val,
      validationType:valType,
      isNew: true});
    console.log(this.fieldsWithValid);
  }


  setTT(event){
    console.log(event);
     this.transinTable = event.target.value;
    this.markOnTTable = true;
    this.http.get('http://localhost:8080/setTransitTable/' + this.transinTable).subscribe();
  }


  constructor(private http: HttpClient,
              private router:Router,
              private ds: DownloadService,
              private fModile: FormsModule) {

  }

  setNewTransitTable(table){
    //this.http.get('http://localhost:8080/getTransitTables').subscribe(res => { this.transitTables = res});
    this.transinTable = table;
    this.transitTables.push({id: this.transitTables.length +1 , name_table: table});
    this.markOnTTable = true;
    this.http.get('http://localhost:8080/setTransitTable/' + this.transinTable).subscribe();
  }


  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
  }

  onDownload() {

    if (this.selectedFile == null) {
      alert("Select file")
    }
    else {
      const fd = new FormData();
      fd.append('excel', this.selectedFile, this.selectedFile.name);
      console.log(fd);

      this.http.post<Element[]>('http://localhost:8080/uploadExcel', fd)
        .subscribe(data=> this.sheets = data);
      console.log(this.sheets);
      this.condition = !this.condition;
        }
    }

    onSelectSheet(sheet: any){
    this.http.get('http://localhost:8082/chousedSheet/'+ sheet['id'])
      .subscribe(res=> this.mappingColumns = res);
    let newIndex = 1;
      for (let map in this.mappingColumns){
        this.mappingColumns[map][0] = newIndex;
        newIndex = newIndex +1;
      }
    this.mappeingTag = !this.mappeingTag;
    this.selectedSheet = sheet.name;
      this.http.get('http://localhost:8082/getSkillGroup')
        .subscribe(res=> this.skillGroup = res);

    }

  returnMappingSkills(){
    let allSkillsIsMapped:boolean = this.checkSkills()
    if (allSkillsIsMapped){
      alert("All skills have to mapped")
      return;
    }
    this.http.get('http://localhost:8080/getTransitTables').subscribe(res => { this.transitTables = res});

    // this.http.post('http://localhost:8082/mappedSkills',this.mappingColumns)
    //   .subscribe(res => {
    //     console.log(res);
    //   });

    this.http.get('http://localhost:8080/getMapField').subscribe( res =>{
      this.mappingFields = res;
    });

    this.mappeingTag = false;
    this.mapFields = false;
    this.http.post('http://localhost:8082/setMappingSkills', this.mappingColumns).subscribe();
  }

  makeMapSkill(){
    // for (let map in this.mappingColumns){
    //   this.mappingColumns[map][3].name = this.mappingColumns[map][1];
    //   this.mappingColumns[map][3].skillGroup.name = this.mappingColumns[map][2];
      for (let skill in this.mappingColumns){
        this.http.post('http://localhost:8082/setOrUpdateSkill', this.mappingColumns[skill][3]).subscribe();
      }
    // }
  }

  checkSkills(){
    for (let map in this.mappingColumns){
      if (this.mappingColumns[map][3] == null ){
        console.log(this.mappingColumns[map]);
        return true;
      }
    }
    return false;
  }

  uploadFieldMapWithOutValidation(){
    this.notDone = false;
    this.http.post('http://localhost:8080/uploadFieldMapWithOutValidation',this.mappingFields).subscribe();
  }


  setMapField(event, mapF){
    this.mappingFields[this.mappingFields.indexOf(mapF)][2] = event.srcElement.value;
  }

  setMapFieldLenght(event, mapF){
    if (event.srcElement.value > 4000){
      this.mappingFields[this.mappingFields.indexOf(mapF)][3] = 4000;
    }
    else if (event.srcElement.value < 3){
      this.mappingFields[this.mappingFields.indexOf(mapF)][3] = 3;
    }
    else {
      this.mappingFields[this.mappingFields.indexOf(mapF)][3] = event.srcElement.value;
    }
  }

  checkMapping(){
    let wrongMap:Array<string> = new Array<string>();
    let isOk:boolean;
    for (let mapSkill in this.mappingFields){
      let countSkill = 0;
      for(let checkMapSkill in this.mappingFields){
        if(this.mappingFields[mapSkill][2] == this.mappingFields[checkMapSkill][2]){
          countSkill = countSkill +1;
        }
      }
      if (countSkill > 1){
        wrongMap.push(this.mappingFields[mapSkill][2]);
      }
    }
    return wrongMap;
  }

  validation(){
    if (this.transinTable==undefined){
      alert("Select SDB table");
      return;
    }

    let mapNoyUnique:Array<String> = this.checkMapping();
    if (mapNoyUnique.length > 0){
      let message: string ="";
      for (let wrongMap in mapNoyUnique){
        message = message + " " + mapNoyUnique[wrongMap] + ","
      }
      message = message + " - this skills are not unique."
      alert(message);
      return;
    }

    this.valid = false;
    this.http.post('http://localhost:8082/uploadFieldMapWithValidation',this.mappingFields).subscribe();
    this.http.get<Array<Object>>('http://localhost:8080/getValidation').subscribe(res => {
      this.mainValidation = res;
      for (var i = 0; i < this.mainValidation.length; i++){
        var tmpField;
        if  (this.mainValidation[i].fieldMap == null){
          tmpField = null;
        }
        else {
          tmpField = this.mainValidation[i].fieldMap.xlsxField;
        }

        this.fieldsWithValid.push({table:this.transinTable,
          field:tmpField,
          validation: this.mainValidation[i].validationsType.typeName,
          validationType:'system',
          isNew: false})
      };
    });
    this.http.get<Array<Object>>('http://localhost:8080/getManualValidation').subscribe(res => {
      this.manualValidation = res;
      for (var i = 0; i < this.manualValidation.length; i++){
        var tmpField;
        if  (this.mainValidation[i].fieldMap == null){
          tmpField = null;
        }
        else {
          tmpField = this.mainValidation[i].fieldMap.xlsxField;
        }

        this.fieldsWithValid.push({table:this.transinTable,
          field:tmpField,
          validation: this.manualValidation[i].sqlText,
          validationType:'manual',
          isNew: false})
      }});
    this.http.get<Array<Object>>('http://localhost:8080/getTypeValidation').subscribe(res => {this.valType = res});
    this.http.get('http://localhost:8080/getFields').subscribe(res => { this.fields = res});
  }

  delValidation(event,thisFWV){
    console.log(event);
    this.fieldsWithValid = this.fieldsWithValid.filter(FWV => FWV != thisFWV);
  }


  doValidation(){
    this.http.post('http://localhost:8080/pathReport' , this.pathForReport).subscribe();
    this.http.post('http://localhost:8080/doValidation', this.fieldsWithValid).subscribe();
  }


  uploadData(){
  this.notDone = false;
    this.http.get('http://localhost:8080/uploadAfterValidation').subscribe();
  }

  setPathReport(event){
    this.pathForReport = event.srcElement.value;

  }
}
