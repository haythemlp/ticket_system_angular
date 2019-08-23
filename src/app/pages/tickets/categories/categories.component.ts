import { Component, OnInit } from '@angular/core';
import {Question} from '../ticket';
import {CategoriesService} from './categories.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {RolesDialogComponent} from '../../roles/roles-dialog/roles-dialog.component';
import {DialogCategoryComponent} from './dialog-category/dialog-category.component';

import {ConfirmationComponent} from '../../../shared/confirmation/confirmation.component';
import {SnackbarService} from '../../../services/snackbar.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public questions: Question[];
  public dataSource: any;
  public spiner: boolean = false;
   public searchText: string;
   public showSearch: boolean = false;

  public displayedColumns = ['id', 'name', 'actions'];

  constructor(private  categoriesService: CategoriesService, public dialog: MatDialog, public snackBar: SnackbarService) {
  }

  ngOnInit() {

    this.getCategories();
  }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  public getCategories(): void {
    this.categoriesService.getList().subscribe(q => {
      this.questions = q;
      this.dataSource = new MatTableDataSource<Question>(this.questions);
      this.spiner = true;


    });
  }

  public openDialog(q: Question) {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      data: Object.assign({}, q)
    });
    dialogRef.afterClosed().subscribe(q => {
      if (q) {
        (q.id) ? this.updateCategory(q) : this.addCategory(q);
      }
    });

  }

  public addCategory(q: Question) {
    this.categoriesService.add(q).subscribe(() => {
      this.getCategories();

      this.snackBar.open('ajouter avec succès', 'success');
    });
  }

  public updateCategory(q: Question) {
    this.categoriesService.update(q).subscribe(() => {
      this.getCategories();
      this.snackBar.open('mise à jour avec succès', 'success');


    });
  }

  public deleteCategory(q: Question) {

 const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '350px',
            data: 'Do you confirm the deletion of this data?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Yes clicked');
                // DO SOMETHING

            this.categoriesService.delete(q.id).subscribe(() => {
      this.getCategories();
      this.snackBar.open('supprimé avec succès', 'success');


                 });

            }
        });



   
  }
}
