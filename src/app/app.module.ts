import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BlogServicesService} from './blog-services.service';
import {AppComponent} from './app.component';
import {UserServicesService} from './user-services.service';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {SignComponent} from './sign/sign.component';
import { YourBlogsComponent } from './your-blogs/your-blogs.component';
import { AddBlogsComponent } from './your-blogs/add-blogs/add-blogs.component';
import { EditBlogsComponent } from './your-blogs/edit-blogs/edit-blogs.component';
import { SearchPipe } from './search.pipe';
import { YourFavComponent } from './your-fav/your-fav.component';


const approutes = [
  {
    path: "", redirectTo: '/home', pathMatch: 'full'
  },

  {
    path: "home", component: HomeComponent
  },
  {
    path: "sign", component: SignComponent
  },
  {
    path: "yourBlog", component: YourBlogsComponent
  },
  {
    path: "**", component: HomeComponent
  }


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignComponent,
    YourBlogsComponent,
    AddBlogsComponent,
    EditBlogsComponent,
    SearchPipe,
    YourFavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(approutes)
  ],
  providers: [BlogServicesService, UserServicesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
