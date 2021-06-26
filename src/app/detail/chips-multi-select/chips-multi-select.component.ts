import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChip, MatChipList } from '@angular/material/chips';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
@UntilDestroy()
@Component({
  selector: 'app-chips-multi-select',
  templateUrl: './chips-multi-select.component.html',
  styleUrls: ['./chips-multi-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChipsMultiSelectComponent,
      multi: true,
    },
  ],
})
export class ChipsMultiSelectComponent implements OnInit, ControlValueAccessor, AfterViewInit  {
  @Input() options: string[] = [];
  onChange!: (value: string[]) => void;
  @ViewChild(MatChipList) chipList!: MatChipList;
  value: string[] = [];
  writeValue(): void {

  }
  selectChips(value: string[]) {
    this.chipList.chips.forEach((chip) => chip.deselect());

    const chipsToSelect = this.chipList.chips.filter((c) =>
      value.includes(c.value)
    );

    chipsToSelect.forEach((chip) => chip.select());
  }

    registerOnChange(fn: any): void {
      this.onChange = fn;
  }

    registerOnTouched(fn: any): void {
  }
  propagateChange(value: string[]) {
    if (this.onChange) {
      this.onChange(value);
    }
}
  constructor() { }
  ngAfterViewInit(): void {
    this.chipList.chipSelectionChanges
    .pipe(
      untilDestroyed(this),
      map((event) => event.source))
    .subscribe((chip) => {
      if (chip.selected) {
        this.value = [...this.value, chip.value];
      } else {
        this.value = this.value.filter((o) => o !== chip.value);
      }

      this.propagateChange(this.value);
    });
  }

  ngOnInit(): void {
  }
  selectfilters(chip: MatChip) {
    chip.toggleSelected();
 }

}
