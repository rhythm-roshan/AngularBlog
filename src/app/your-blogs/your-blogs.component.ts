import {Component, OnInit} from '@angular/core';
import {BlogServicesService} from "../blog-services.service";
import {UserServicesService} from "../user-services.service";


@Component({
  selector: 'app-your-blogs',
  templateUrl: './your-blogs.component.html',
  styleUrls: ['./your-blogs.component.css']
})
export class YourBlogsComponent implements OnInit {
  Actualitems: Object[] = [];
  items: Object[] = [];
  users: Object[] = [];

  constructor(private request: BlogServicesService, private user: UserServicesService) {
  }

  ngOnInit() {
    this.getBlogs();
    this.getUsers();

  }


  getBlogs() {
    this.request.loadData()
      .subscribe((data) => {
        this.Actualitems = data;

        let temp = JSON.parse(sessionStorage.getItem("currentuser"));
        console.log(this.Actualitems);
        this.Actualitems.forEach(data => {

          if (temp.id == data['authorId']) {

            this.items.push(data);
          }

        })

        console.log(this.items);
      })


  }

  getUsers() {
    this.user.loadData()
      .subscribe((data) => {

        this.users = data;
      })

    this.request.loadData().subscribe((data) => {
      this.Actualitems = data;
    })

  }

  addBlog(event) {

    let temp = JSON.parse(sessionStorage.getItem("currentuser"));
    console.log("hey")
    let blog = {
      title: event.name,
      content: event.desc,
      type: event.type,
      authorId: temp.id,
      author: temp.username
    };

    this.request.postData(blog)
      .subscribe(data => {
        this.items.push(data);
        this.getBlogs();
      })


  }


  deleteBlogFinal(item) {
    this.request.deleteData(item.id)
      .subscribe(data => {
        this.getBlogs();
        console.log(data);
        this.getUsers();
        console.log("shfv");

        this.allDel(item);


      })

  }

  allDel(item) {
    this.users.forEach(User => {
      console.log("hjsgf");
      console.log(User['favourites'].find(val => val == item.id))
      if (User['favourites'].find(val => val == item.id)) {
        var arr = User['favourites'];
        var pos = arr.indexOf(item.id);
        arr.splice(pos, 1);
        var tempUser = {
          id: User['id'],
          username: User['username'],
          password: User['password'],
          favourites: arr
        }
        this.user.updateData(tempUser).subscribe(data => console.log(data));


      }
    })
  }
}
