import {Component, OnInit} from '@angular/core';
import {BlogServicesService} from "../blog-services.service";
import {UserServicesService} from "../user-services.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs: Object[] = [];
  users: Object[] = [];
  updatedUser;
  arr: Number[] = [];
  fav = "Mark As Fav";

  constructor(private request: BlogServicesService, private user: UserServicesService, private router: Router) {
  }

  ngOnInit() {
    this.getBlogs();
    this.getUsers();
  }

  getBlogs() {
    this.request.loadData()
      .subscribe((data) => {
        this.blogs = data;
      });
  }

  getUsers() {
    this.user.loadData()
      .subscribe((data) => {
        this.users = data;
      });
  }

  MarkAsFav(id) {
    let temp = JSON.parse(sessionStorage.getItem("currentuser"));
    if (temp == null) {
      alert("login in first");
      window.location.reload();
      this.router.navigate(["/sign"]);

    }

    else {

      var tempUser = this.users.find(data => data['id'] == temp.id);
      var tempFav = tempUser['favourites'].find(ID => ID == id)
      this.arr = tempUser['favourites'];
      if (tempFav) {

        var position = tempUser['favourites'].indexOf(tempFav);
        this.arr.splice(position, 1)
        this.updatedUser = {
          id: tempUser['id'],
          username: tempUser['username'],
          password: tempUser['password'],
          favourites: this.arr
        }
        this.fav = "Mark as Fav";
        this.user.updateData(this.updatedUser).subscribe(data => console.log(data));
      }
      else {
        this.arr.push(id);
        this.updatedUser = {
          id: tempUser['id'],
          username: tempUser['username'],
          password: tempUser['password'],
          favourites: this.arr
        }
        this.fav = "Marked";
        this.user.updateData(this.updatedUser).subscribe(data => console.log(data));

      }
    }

    window.location.reload();

  }

  isFav(id): boolean {
    return this.arr.indexOf(id) !== -1;
  }

  isFavNot(id): boolean {
    return this.arr.indexOf(id) == -1;
  }

}
