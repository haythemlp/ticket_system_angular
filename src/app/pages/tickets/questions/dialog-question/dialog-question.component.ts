import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Menu} from '../../../../theme/components/menu/menu.model';
import {verticalMenuItems} from '../../../../theme/components/menu/menu';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Category} from '../../ticket';

@Component({
  selector: 'app-dialog-question',
  templateUrl: './dialog-question.component.html',
  styleUrls: ['./dialog-question.component.scss']
})
export class DialogQuestionComponent implements OnInit {


  public form: FormGroup;
  public menu: Menu[] = verticalMenuItems;

  constructor(public dialogRef: MatDialogRef<DialogQuestionComponent>,
              @Inject(MAT_DIALOG_DATA) public quest,
              public fb: FormBuilder) {

    this.form = this.fb.group({
      id: null,
      text: [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ngOnInit() {
    if (this.quest) {


      this.form.patchValue(this.quest);

    } else {
      this.quest = new Category();
    }
    this.form.updateValueAndValidity();
  }


  close(): void {
    this.dialogRef.close();
  }
}
