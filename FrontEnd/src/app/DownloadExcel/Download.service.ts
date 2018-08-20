import {Component, Injectable} from "@angular/core";

@Component({


})
export class DownloadService {

  public mappingColumns;

  public getMappingColumns(){
    return this.mappingColumns;
  }

  public setMappingColumns(array) {
  this.mappingColumns = array;
  }

}
