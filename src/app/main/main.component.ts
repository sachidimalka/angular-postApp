import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MainService } from './main.service';
import { PostDetail } from './main/main.module';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'body', 'action'];
  subscriptions: Array<Subscription> = [];
  postList: any;
  constructor(public _service: MainService,) {
  }

  ngOnInit(): void {

    this.GetPostDetail();
    this.subscriptions.push(
      this._service.openMainPage$.subscribe((data) => {
        this.postList.push(data.updated);
      })
    );
  }

  GetPostDetail() {
    this._service.GetPostDetail().subscribe((data) => {
      console.log("ooo", data)
      this.postList = data;
    })
  }

  deletePost(row_obj: any) {
    this.postList = this.postList.filter((value: any, key: any) => {
      return value.id != row_obj.id;
    });
    this._service.deletePost(row_obj.id)
      .subscribe(
        res => {
        },
      )
  };
}
