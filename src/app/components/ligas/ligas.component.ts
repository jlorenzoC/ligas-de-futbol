import { Liga } from '../../models/liga.model';
import { LigasService } from './../../services/ligas.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.scss'],
})
export class LigasComponent implements OnInit {
  ligas: Observable<Liga[]> = of([]);

  constructor(private ligasService: LigasService) {}

  ngOnInit(): void {
    this.ligas = this.ligasService.getLigas().pipe(shareReplay());
  }
}
