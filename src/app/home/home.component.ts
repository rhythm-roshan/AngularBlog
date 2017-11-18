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
  /************* GET ALL BLOGS***************/

  getBlogs() {
    this.request.loadData()
      .subscribe((data) => {
        this.blogs = data;
      });
  }

  /************* GET ALL USERS***************/
  getUsers() {
    this.user.loadData()
      .subscribe((data) => {
        this.users = data;

      });
  }

  /************* MARK OR UNMARK A PARTICULAR BLOG AS FAV***************/

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
        this.arr.sort();
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

  /*******TO CHECK WHETHER A PARTICULAR BLOG IS MARKED OR NOT AS FAV OF CURRENT USER [LOGGED IN] ***********/
  isFav(id): string {
    if(id) {
      let temp = JSON.parse(sessionStorage.getItem("currentuser"));
      if (temp != null) {
        let tempUser = this.users.find(data => data['id'] == temp.id);
        if (tempUser != null) {
          if (tempUser['favourites'].includes(id))
            return "MARKED";
          else
            return "MARK AS FAV";
        }
      }
      else {
        return "Mark As Fav";
      }
    }

  }


}
