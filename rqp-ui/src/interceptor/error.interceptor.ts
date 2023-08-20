import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
//import {ErrorService} from '../app/services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

 
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";
        console.log(error)
        if (error.message) {
          errorMessage = error.message;
        }
        this.dialog.open(MessageDialogComponent, {data: {'message': errorMessage,'heading':"Error Information"}});
        // this.errorService.throwError(errorMessage);
        return throwError(error);
      })
    );
  }
}

