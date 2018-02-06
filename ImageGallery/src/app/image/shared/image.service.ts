import {Injectable} from '@angular/core';


@Injectable()
export class ImageService{
visibleImages = [];

    getImages(){
        return this.visibleImages = images.slice(0);
    }

    getImage(id: number){
        return images.slice(0).find(image =>image.id==id)
    }
}
const images=[
{"id":1,"category":"india","caption":"taj mahal","url":"assets/img/tajamahal.jpg"},
{"id":2,"category":"paris","caption":"paris","url": "assets/img/paris1.jpg"},
{"id":3,"category":"india","caption":"charminar","url":"/assets/img/Charminar.jpg"},
{"id":4,"category":"paris","caption":"eiffle tower","url":"/assets/img/pairs.jpg"},
{"id":5,"category":"india","caption":"punjab","url":"/assets/img/amritsar.jpg"},
{"id":6,"category":"venice","caption":"venice island","url":"/assets/img/venice.jpg"},
{"id":7,"category":"venice","caption":"venice bridge","url":"/assets/img/venice1.jpg"},
{"id":8,"category":"venice","caption":"venice street","url":"/assets/img/venice2.jpg"},
]