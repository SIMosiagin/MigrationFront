import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-transit-table',
  templateUrl: './transit-table.component.html',
  styleUrls: ['./transit-table.component.css']
})
export class TransitTableComponent implements OnInit {

  transitTable;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }


  open(content) {
    //this.skillGroup = content._parentView.parent.component.getSkillGroup;
    this.modalService.open(content).result.then((result) => {
      content._parentView.parent.component.setNewTransitTable(this.transitTable);
    });
  }
}
