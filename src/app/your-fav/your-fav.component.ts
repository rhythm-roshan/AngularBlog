import {Component, OnInit} from '@angular/core';
import {BlogServicesService} from "../blog-services.service";
import {UserServicesService} from "../user-services.service";

@Component({
  selector: 'app-your-fav',
  templateUrl: './your-fav.component.html',
  styleUrls: ['./your-fav.component.css']
})
export class YourFavComponent implements OnInit {


  blogs: Object[] = [];
  users: Object[] = [];

  filterBlogs: Object[] = [];

  constructor(private request: BlogServicesService, private user: UserServicesService) {
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
        this.filter();
      });
  }

  filter() {

    let temp = JSON.parse(sessionStorage.getItem("currentuser"));
    var tempUser = this.users.find(data => data['id'] == temp.id);
    console.log(tempUser);
    console.log("hey");
    this.blogs.forEach(data1 => {
      console.log("yo"+data1);
      if (tempUser['favourites'].find(id => id == data1['id'])) {
        this.filterBlogs.push(data1);
      }

    })

    console.log(this.filterBlogs);


  }


}
