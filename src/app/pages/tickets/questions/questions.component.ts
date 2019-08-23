import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {QuestionsService} from './questions.service';
import {Question} from '../ticket';
import {DialogQuestionComponent} from './dialog-question/dialog-question.component';
import {ConfirmationComponent} from '../../../shared/confirmation/confirmation.component';
import {SnackbarService} from '../../../services/snackbar.service';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})


export class QuestionsComponent implements OnInit {
    public questions: Question[];
    public dataSource: any;
    public spiner: boolean = false;
     public searchText: string;
   public showSearch: boolean = false;

    public displayedColumns = ['id', 'name', 'actions'];

    constructor(private  questionsService: QuestionsService, public dialog: MatDialog, public snackBar: SnackbarService) {
    }

    ngOnInit() {

        this.getQuestions();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public getQuestions(): void {
        this.questionsService.getList().subscribe(q => {
            this.questions = q;
            this.dataSource = new MatTableDataSource<Question>(this.questions);
            this.spiner = true;


        });
    }

    public openDialog(q: Question) {
        const dialogRef = this.dialog.open(DialogQuestionComponent, {
            data: Object.assign({}, q)
        });
        dialogRef.afterClosed().subscribe(q => {
            if (q) {
                (q.id) ? this.updateQuestion(q) : this.addQuestion(q);
            }
        });

    }

    public addQuestion(q: Question) {
        this.questionsService.add(q).subscribe(() => {
            this.getQuestions();

            this.snackBar.open('ajouter avec succès', 'success');
        });
    }

    public updateQuestion(q: Question) {
        this.questionsService.update(q).subscribe(() => {
            this.getQuestions();
            this.snackBar.open('mise à jour avec succès', 'success');


        });
    }

    public deleteQuestion(q: Question) {
        


         const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '350px',
            data: 'Do you confirm the deletion of this data?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Yes clicked');
                // DO SOMETHING

           this.questionsService.delete(q.id).subscribe(() => {
            this.getQuestions();
            this.snackBar.open('supprimé avec succès', 'success');


        });

            }
        });
    }

}
