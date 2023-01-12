import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

interface ICat {
  id: string;
  name: string;
  url: string;
}

interface ISelectedData {
  breed: string;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class CatDataService {
  private catPictures: string[] = [];
  private breed: string = '';
  private limit: number = 0;
  private isConfirmed: boolean = false;

  getCatPictures(): string[] {
    return this.catPictures;
  }

  constructor(private http: HttpClient) {}

  getAll(): Observable<ICat[]> {
    return this.http.get<ICat[]>('https://api.thecatapi.com/v1/breeds');
  }

  getCatsPictures(breed: string, picturesCount: number): Observable<string[]> {
    let subject = new Subject<string[]>();
    this.catPictures.splice(0, this.catPictures.length);

    this.http
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}&limit=${picturesCount}`)
      .subscribe((result: any) => {
        result.forEach((element: ICat) => {
          this.catPictures.push(element.url);
        });

        subject.next(this.getCatPictures());
      });
    return subject.asObservable();
  }

  setBreedAndPicturesCount(breed: string, limit: number) {
    this.breed = breed;
    this.limit = limit;
  }

  getBreedAndPicturesCount(): ISelectedData {
    return { breed: this.breed, limit: this.limit };
  }

  setConfirm(confirm: boolean) {
    this.isConfirmed = confirm;
  }

  confirmedStatus(): boolean {
    return this.isConfirmed;
  }
}
