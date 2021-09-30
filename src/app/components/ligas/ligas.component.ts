import { Liga } from '../../models/liga.model';
import { LigasService } from './../../services/ligas.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.sass'],
})
export class LigasComponent implements OnInit {
  ligas: Observable<Liga[]> = of([]);

  constructor(private ligasService: LigasService) {}

  ngOnInit(): void {
    this.ligas = this.ligasService.getLigas();
  }
}
