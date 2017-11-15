import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-edit-blogs',
  templateUrl: './edit-blogs.component.html',
  styleUrls: ['./edit-blogs.component.css']
})
export class EditBlogsComponent implements OnInit {

  @Input() blogs;

  filterBlogs : Object[];

  @Output() deleteBlogs: EventEmitter<any> = new EventEmitter();

  @Output() updateBlogs: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }



  deleteBlog(Blogs) {
    this.deleteBlogs.emit(Blogs);
    window.location.reload();
  }

  updateBlog(Blogs){
    this.updateBlogs.emit(Blogs);
  }
}
