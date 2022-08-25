import { Injectable } from '@angular/core';
import { PostDetail } from './main/main.module'
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  GetPostDetail() {
    return this.http.get('https://localhost:5001/api/post');
  }

  GetSelectedPostDetail(id: number) {
    return this.http.get('https://localhost:5001/api/post/' + id);
  }

  CreatePost(formData: any) {
    console.log("ll", formData)
    return this.http.post('https://localhost:5001/api/post', formData);
  }

  UpdatePost(formData: any, id: number) {
    console.log("lluuu", formData, id)
    return this.http.post('https://localhost:5001/api/post/' + id, formData);
  }

  deletePost(id: number) {
    return this.http.delete('https://localhost:5001/api/post/' + id);
  }

  private _openMainPage = new Subject<any>();
  openMainPage$ = this._openMainPage.asObservable();

  openMainPage(data: any) {
    this._openMainPage.next(data);
  }

  private _openUpdateMainPage = new Subject<any>();
  openUpdateMainPage$ = this._openUpdateMainPage.asObservable();

  openUpdateMainPage(data: any) {
    this._openUpdateMainPage.next(data);
  }

}
