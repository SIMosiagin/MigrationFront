import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css'],

})
export class AddSkillComponent implements OnInit {

  closeResult: string;
  @Input() skillDescription:string = "";
  @Input() skillGroupDescription:string = "";

  @Input() skill;
  @Input() skillGroup:Array<any>;




  constructor(private modalService: NgbModal) {}

  ngOnInit() {

  }

  addSkillGroup(sgName:string, string:string ){
    this.skillGroup.push( {id: 0, name: sgName, description: string});
  }

  setSG(event){
    for(let sg in this.skillGroup){
      if(this.skillGroup[sg].id == event.srcElement.value){
        this.skill[3].skillGroup = this.skillGroup[sg];
        break;
      }
    }
    // this.skill[3].skillGroup = this.skillGroup event.srcElement.value;
  }




  open(content) {

    this.modalService.open(content).result.then((result) => {
      content._parentView.parent.component.setDescription(content._parentView.parent.oldValues[2],this.skill);

      content._parentView.parent.component.setSkillGroup(this.skillGroup);



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


interface myObj {
  id:number;
  skillGroup:string;
  skillExcel:string;
  dbSkillGroup:string;
  dbSkillGroupDesc:string;
  dbSkill:string;
  dbSkillDesc:string;
  skill:skill
};

interface skill {
  id:number;
  name:string;
  disc:string;
  skillGroup:skillGroup
}

interface skillGroup {
  id:number;
  name: string;
  disc: string;
}
