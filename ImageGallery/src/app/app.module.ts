import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ImageFilterPipe} from './image/shared/filter.pipe';
import {AlertModule} from 'ng2-bootstrap';
import {appRoutes} from '../route';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery.component';
import {ImageComponent} from './image/image-detail.component';
import { ImageService } from './image/shared/image.service';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GalleryComponent,
    ImageComponent,
    ImageFilterPipe,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
   HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(appRoutes)
    
  ],  
  providers: [ImageService, ImageFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
