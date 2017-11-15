import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserServicesService} from "../user-services.service";


@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  model: any = {};
  loading = false;
  load = true;
  items: Object[];
  flag: boolean = false;

  constructor(private request: UserServicesService, private router: Router) {

  }

  ngOnInit() {
    this.getUser();
    this.login();
  }

  check() {
    let temp = JSON.parse(sessionStorage.getItem("currentuser"));
    console.log(temp);
    if (temp != null) {
      this.load = false;
      sessionStorage.removeItem("currentuser");
      this.reload();
      this.router.navigate(["/app"]);
    }

  }

  reload() {
    window.location.reload();
  }

  getUser() {
    this.request.loadData()
      .subscribe((data) => {
        this.items = data;
      })
  }


  login() {

    this.check();
    console.log(this.model.username);
    console.log(this.model.password);

    let temp = JSON.parse(sessionStorage.getItem("currentuser"));
    console.log(temp);
    if (temp == null && this.model.username != null) {
      this.items.forEach(data => {
        if (data['username'] == this.model.username && data['password'] == this.model.password) {
          this.loading = true;
          console.log("success");
          console.log(data);

          var tempObj = {
            id : data['id'],
            username: data['username']
          };
          sessionStorage.setItem("currentuser", JSON.stringify(tempObj));
          //alert("Sucessfull login");
          this.reload();
          this.router.navigate(["/app"]);
          this.flag = true;
        }


      });

      if (!this.flag) {


        alert("Wrong Username or password");

      }

    }

  }


}
