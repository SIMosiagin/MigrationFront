import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-validation',
  templateUrl: './add-validation.component.html',
  styleUrls: ['./add-validation.component.css']
})
export class AddValidationComponent implements OnInit {

  isField:boolean = false;
  isExcel:boolean = false;
  isTypeVal:boolean = false;
  isSystemType:boolean = false;
  isManualType:boolean = false;
  selVal:boolean = false;

  typeValid =
    [{name: "system"},
      {name: "manual"}];

  @Input() fields;
  @Input() Excel;
  @Input() systemValid;
  @Input() manualValid =[];

  tmpField;
  tmpTypeVal;
  tmpVal;



  arrayValid = [];

  fieldOrExcel;
  typeValididation;
  validation;



  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  forField(){
    console.log(this.fields);
    this.isField = true;
    this.isExcel = false;
    this.isTypeVal = true;
  }

  forExcel(){
    console.log(this.Excel);
    this.isExcel = true;
    this.isField = false;
    this.isTypeVal = true;
  }

  selectedType(event){
    console.log(this.typeValid);
    if (event.target.value == "system"){
      this.isSystemType = true;
      this.isManualType = false;
      this.tmpTypeVal = "system";
    }
    else {
      this.isSystemType = false;
      this.isManualType = true;
      this.tmpTypeVal = "manual";
    }

    this.typeValididation = name;
    this.selVal = true;
}

  selectedSystem(event){
    console.log(event);
    this.validation = event.target.value;
    this.tmpVal = event.target.value;
}

  setManualValid(sqlText){
    this.manualValid.push({ id: this.manualValid.length, sqlText:sqlText, validation:{fieldmap:null, id:null, tabMapXLSX: null, validationsType: null}})
}

  selectedManual(event){
    console.log(event);
    this.validation = event.target.value;
    this.tmpVal = event.target.value;
  }

  changefield(event){
    this.tmpField = event.target.value;
  }



  open(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(result);
      content._parentView.parent.component.setInToFieldsWithValid(this.Excel, this.tmpField, this.tmpVal, this.tmpTypeVal);
    });
    this.tmpField = undefined;

    if (this.fieldOrExcel = undefined){
      this.fieldOrExcel = this.Excel;
    }
    var str = {fieldOrExcel: this.fieldOrExcel, typeValididation: this.typeValididation, validation: this.validation};
    this.arrayValid.push(str);
    console.log(this.arrayValid);

    this.isField = false;
    this.isExcel = false;
    this.isTypeVal = false;
    this.isSystemType = false;
    this.isManualType = false;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
