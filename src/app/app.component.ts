import { Component, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

import {MdPaginator} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private http: HttpClient) {

  }

  displayedColumns = ['id', 'name', 'status', 'start', 'end', 'link'];
  pipelineDatabase = new PipelineDatabase(this.http);
  dataSource: PipelineDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  ngOnInit() {
    this.dataSource = new PipelineDataSource(this.pipelineDatabase, this.paginator);
  }
  navigateToLink(rowId){
    console.log(rowId)
  }
}
export interface PipelineRun {
  id: string;
  name: string;
  status: string;
  start: string;
  end: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class PipelineDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<PipelineRun[]> = new BehaviorSubject<PipelineRun[]>([]);
  get data(): PipelineRun[] { return this.dataChange.value; }


  constructor(private http: HttpClient) {

    this.http
      .get<PipelineRun>('http://carsinbikelanesboston.com/example.json')
      .subscribe(data => {
        for(let i = 0; i < Object.keys(data).length; i++) {
          this.addPipeline(data[i]);
        }
      },
      err => {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    });
  }

  /** Adds a new pipeline to the database. */
  addPipeline(pipelineRun: PipelineRun) {
    const copiedData = this.data.slice();
    copiedData.push(pipelineRun);
    this.dataChange.next(copiedData);
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class PipelineDataSource extends DataSource<any> {
  constructor(private _pipelineDatabase: PipelineDatabase, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PipelineRun[]> {
    const displayDataChanges = [
      this._pipelineDatabase.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._pipelineDatabase.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}
