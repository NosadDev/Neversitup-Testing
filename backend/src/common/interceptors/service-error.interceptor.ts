import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Observable, catchError, tap } from 'rxjs';

@Injectable()
export class ServiceErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((v) => {
        if (v?.name && v?.status && v?.message) {
          throw new HttpErrorByCode[v.status](v.message);
        }
        return v;
      }),
      catchError((e) => {
        if (e['code'] == 'ECONNREFUSED') {
            throw new ServiceUnavailableException('Unable to connect service')
        }else{
            throw e;
        }
      }),
    );
  }
}
