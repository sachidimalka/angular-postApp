import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main/main.service';
import { NgForm } from '@angular/forms';
import { PostDetail } from '../main/main/main.module';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  editPostForm: FormGroup | any;
  postIdFromRoute = 0;
  selectedPost: any;

  constructor(public _service: MainService, private route: ActivatedRoute,
    private router: Router
  ) {
    this.editPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.postIdFromRoute = Number(routeParams.get('id'));
    this.GetSelectedPostDetail();
  }

  onSubmit() {
    if (!this.editPostForm.valid) {
      return;
    }
    localStorage.setItem('post', this.editPostForm.value);

    this._service.UpdatePost(this.editPostForm.value, this.postIdFromRoute).subscribe(
      (res) => { })

    let data = {
      updated: true,
      id: this.postIdFromRoute,
      updatedData: this.editPostForm.value
    }

    this._service.openMainPage(data);

    this.router.navigate(['/main']).then(() => {
      window.location.reload();
    });
  }

  GetSelectedPostDetail() {
    this._service.GetSelectedPostDetail(this.postIdFromRoute).subscribe((data) => {
      this.selectedPost = data;
    })
  }

}
