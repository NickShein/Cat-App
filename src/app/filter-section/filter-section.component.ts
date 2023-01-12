import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CatDataService } from '../services/cat-data.service';

interface iSelectValues {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.css'],
})
export class FilterSectionComponent implements OnInit {
  @Output() clickEvent = new EventEmitter();

  cats: iSelectValues[] = [];
  catsIDs: string[] = [];
  values: iSelectValues[] = [];
  isSubmitted = false;

  constructor(public fb: FormBuilder, private catService: CatDataService) {}

  registrationForm = this.fb.group({
    catName: [ '', [Validators.required]],
    countValues: [ '10', []],
  });

  ngOnInit(): void {
    this.catService.getAll().subscribe((result) => {
      for (let i = 0; i < result.length; i++) {
        this.catsIDs.push(result[i].id);
        this.cats.push({ value: `${result[i].name}-${i}`, viewValue: `${result[i].name}` });
      }
    });

    for (let i = 0; i < 60; i++) {
      this.values.push({
        value: `${i + 1}-${i}`,
        viewValue: `${i + 1}`,
      });
    }
  }

  get catName() {
    return this.registrationForm.get('catName');
  }

  get countValues() {
    return this.registrationForm.get('countValues');
  }

  changeCat(e: any) {
    this.catName?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeCountValues(e: any) {
    this.countValues?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (!this.registrationForm.valid) {
      return;
    }

    if (typeof this.catName?.value == 'string' && typeof this.countValues?.value == 'string') {
      this.catService.setConfirm(true);

      this.catService.setBreedAndPicturesCount(
        this.catsIDs[+this.catName.value.split('-')[1]],
        +this.countValues?.value
      );

      this.clickEvent.emit(null);
    }
  }
}
