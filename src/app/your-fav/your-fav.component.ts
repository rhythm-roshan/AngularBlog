import {ChangeDetectorRef, Component, OnInit, OnChanges} from '@angular/core';
import {BlogServicesService} from "../blog-services.service";
import {UserServicesService} from "../user-services.service";

@Component({
  selector: 'app-your-fav',
  templateUrl: './your-fav.component.html',
  styleUrls: ['./your-fav.component.css']
})
export class YourFavComponent implements OnInit, OnChanges {

  rerender = false;
  blogs: Object[] = [];
  users: Object[] = [];

  filterBlogs: Object[] = [];

  constructor(private request: BlogServicesService, private user: UserServicesService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getBlogs();
    this.getUsers();
    this.doRerender();

  }

  ngOnChanges() {
    this.doRerender();
  }


  doRerender() {
    this.rerender = true;
    this.cdRef.detectChanges();
    this.rerender = false;
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
    if (temp != null) {
      var tempUser = this.users.find(data => data['id'] == temp.id);

      this.blogs.forEach(data1 => {
        console.log("yo" + data1);
        if (tempUser['favourites'].find(id => id == data1['id'])) {
          this.filterBlogs.push(data1);
        }

      })
    }


  }


}
