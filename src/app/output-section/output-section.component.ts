import { Component } from '@angular/core';
import { CatDataService } from '../services/cat-data.service';
import { SlideInterface } from '../image-slider/types/slide.interface';

@Component({
  selector: 'app-output-section',
  templateUrl: './output-section.component.html',
  styleUrls: ['./output-section.component.css'],
})
export class OutputSectionComponent{
  breed: string = '';
  limit: number = 0;
  isHidden: boolean = true;
  slides: SlideInterface[] = [];

  constructor(private catService: CatDataService) {}

  showCats(): void {
    this.isHidden = true;
    this.breed = this.catService.getBreedAndPicturesCount().breed;
    this.limit = this.catService.getBreedAndPicturesCount().limit;

    this.catService.getCatsPictures(this.breed, this.limit).subscribe((result) => {
      this.slides.splice(0, this.slides.length);

      for (let i = 0; i < result.length; i = i + 1) {
        this.slides.push({ url: result[i], title: this.breed + i });
      }

      this.isHidden = false;
    });
  }
}
