import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liga } from '../models/liga.model';

@Injectable({
  providedIn: 'root',
})
export class LigasService {
  constructor(private http: HttpClient) {}

  getLigas(): Observable<Liga[]> {
    return this.http.get<Liga[]>('leagues');
  }
}
