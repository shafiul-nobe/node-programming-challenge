import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  generated: boolean = false;
  generating: boolean = false;
  title = 'Client';
  report : any;
  showReport : boolean = false;

  constructor(
    private dataService: DataService
  ) {

  }

  ngOnInit() {
    this.generated = false;
  }

  fileGenerate() {
    this.generating = true;
    this.dataService.generateFile().subscribe(data => {
      console.log(data);
      this.generated = true;
      this.generating = false;
      this.showReport = false;
    })
  }

  getReport() {
    this.dataService.getReport().subscribe(data => {
      debugger;
      this.report = data;
      this.showReport = true;
    })

  }

  download()
  {
    this.dataService.download().subscribe( data =>{
      
    })
  }

}
