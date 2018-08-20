import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-manual-valid-data',
  templateUrl: './add-manual-valid-data.component.html',
  styleUrls: ['./add-manual-valid-data.component.css']
})
export class AddManualValidDataComponent implements OnInit {

  closeResult: string;

  sqlText;


  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  setNewSkillGroup(name: string, disc: string){


  }

  open(content) {

    this.modalService.open(content).result.then((result) => {
      content._parentView.parent.component.setManualValid(this.sqlText);

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
