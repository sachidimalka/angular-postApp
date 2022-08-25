import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../main/main.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  subscriptions: Array<Subscription> = [];
  postIdFromRoute = 0;
  selectedPost: any;
  constructor(private route: ActivatedRoute, public _service: MainService) {

    const routeParams = this.route.snapshot.paramMap;
    this.postIdFromRoute = Number(routeParams.get('id'));

  }


  ngOnInit(): void {
    this.GetSelectedPostDetail();
  }

  GetSelectedPostDetail() {
    this._service.GetSelectedPostDetail(this.postIdFromRoute).subscribe((data) => {
      console.log("iii", data)
      this.selectedPost = data;
    })
  }
}
