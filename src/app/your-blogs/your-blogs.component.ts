import {Component, OnInit} from '@angular/core';
import {BlogServicesService} from "../blog-services.service";

@Component({
  selector: 'app-your-blogs',
  templateUrl: './your-blogs.component.html',
  styleUrls: ['./your-blogs.component.css']
})
export class YourBlogsComponent implements OnInit {
  Actualitems: Object[]=[];
  items: Object[]=[];

  constructor(private request: BlogServicesService) {
  }

  ngOnInit() {
    this.getBlogs();
  }


  getBlogs() {
    this.request.loadData()
      .subscribe((data) => {
        this.Actualitems = data;

        let temp = JSON.parse(sessionStorage.getItem("currentuser"));
        console.log(this.Actualitems);
        this.Actualitems.forEach(data => {
          console.log("yo");
          console.log(temp.id);
          console.log(data['authorId']);
          if (temp.id == data['authorId']) {
            console.log("hi bharti..!!");
            this.items.push(data);
          }

        })

        console.log(this.items);
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
        console.log(data)
      })

  }

}
