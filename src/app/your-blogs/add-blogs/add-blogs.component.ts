import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlogServicesService} from "../../blog-services.service";

@Component({
  selector: 'app-add-blogs',
  templateUrl: './add-blogs.component.html',
  styleUrls: ['./add-blogs.component.css']
})
export class AddBlogsComponent implements OnInit {

  title;
  content;
  type;
  buttonName = 'ADD';
  newBlog;

  @Input() items;

  @Output() addBlogs: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteBlog: EventEmitter<any> = new EventEmitter();

  constructor(private request: BlogServicesService) {
  }

  ngOnInit() {

  }

  addBlog(name, desc,type) {

    if (this.buttonName == 'UPDATE') {

      let temp = JSON.parse(sessionStorage.getItem("currentuser"));
      this.newBlog.title = name;
      this.newBlog.content = desc;
      this.newBlog.author = temp.username;
      this.newBlog.authorId =temp.id;
      this.newBlog.type = type  ;
      this.updateBlogDATA(this.newBlog);
    }
    else {
      this.addBlogs.emit({name, desc,type});
      this.title = "";
      this.content = "";
      this.type ="";
      window.location.reload();
    }
  }


  deleteBlogDATA(blog) {
    this.deleteBlog.emit(blog);
  }

  updateBlogDATA(blog) {


    this.request.updateData(blog)
      .subscribe(data => {
        this.buttonName = 'ADD'
        this.content = "";
        this.title = "";
        this.type="";
        console.log(data);
      })


  }

  loadBlog(blog) {
    this.title = blog.title;
    this.content = blog.content;
    this.type = blog.type;
    this.buttonName = "UPDATE";
    this.newBlog = blog;

  }
}
