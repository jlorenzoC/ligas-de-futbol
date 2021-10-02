import { map, tap } from 'rxjs/operators';
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

  getLiga(idDeLaLiga: string): Observable<Liga[]> {
    return this.http.get<Liga[]>(`leagues?Identificador=${idDeLaLiga}`);
  }

  getNombreDeLaLiga(idDeLaLiga: string): Observable<string> {
    return this.http
      .get<Liga[]>(`leagues?Identificador=${idDeLaLiga}`)
      .pipe(map(this.nombreDeLaliga));
  }

  private nombreDeLaliga = (ligas: Liga[]): string => {
    return ligas[0]['Nombre De La Liga'];
  };
}
