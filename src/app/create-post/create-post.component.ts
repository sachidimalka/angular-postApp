import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MainService } from '../main/main.service';
import { PostDetail } from '../main/main/main.module';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup | any;
  title = 'material-login';

  constructor(public _service: MainService,
    private router: Router
  ) {
    this.createPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    if (!this.createPostForm.valid) {
      return;
    }
    localStorage.setItem('post', this.createPostForm.value)

    this._service.CreatePost(this.createPostForm.value).subscribe(
      (res) => { })
    let data = {
      updated: false,
      updatedData: this.createPostForm.value
    }
    this._service.openMainPage(data);


    this.router.navigate(['/main']).then(() => {
      window.location.reload();
    });
  }

}
