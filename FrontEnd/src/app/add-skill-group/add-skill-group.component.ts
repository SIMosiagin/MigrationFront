import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-skill-group',
  templateUrl: './add-skill-group.component.html',
  styleUrls: ['./add-skill-group.component.css']
})
export class AddSkillGroupComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  skillGroup;
  skillGroupDiscription;

  closeResult;

  ngOnInit() {
  }


  open(content) {
    //this.skillGroup = content._parentView.parent.component.getSkillGroup;
    this.modalService.open(content).result.then((result) => {
      content._parentView.parent.component.addSkillGroup(this.skillGroup, this.skillGroupDiscription)
      console.log("add-skill-group");
      console.log(content);
      // content._parentView.parent.component.setMap(this.skill, content._parentView.parent.oldValues[0]);
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
