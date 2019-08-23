import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Menu} from '../../../../theme/components/menu/menu.model';
import {verticalMenuItems} from '../../../../theme/components/menu/menu';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Category} from '../../ticket';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit {

  public form: FormGroup;
  public menu: Menu[] = verticalMenuItems;

  constructor(public dialogRef: MatDialogRef<DialogCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public cat,
              public fb: FormBuilder) {

    this.form = this.fb.group({
      id: null,
      text: [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ngOnInit() {
    if (this.cat) {


      this.form.patchValue(this.cat);

    } else {
      this.cat = new Category();
    }
    this.form.updateValueAndValidity();
  }


  close(): void {
    this.dialogRef.close();
  }
}
