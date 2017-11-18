import {Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  sign = 'Sign In';
  link = {
    home: ["/home"],
    about: ["/about"],
    sign: ["/sign"],
    yourblog :["/yourBlog"]
  }

  ngOnInit(){

    this.namechange();
  }
/**  to switch the name between sign in or sign out **/
  namechange() {

    let temp = JSON.parse(sessionStorage.getItem("currentuser"));
    if (temp == null) {
      this.sign = "Sign In"
    } else {
      this.sign = "Sign Out";
    }

  }
}
