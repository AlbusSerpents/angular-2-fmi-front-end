import { Injectable } from '@angular/core';
import { ConnectorService } from 'src/app/core/http/connector.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CompetitionsService {

  constructor(private connector: ConnectorService) { }

  listCompeitions(search: CompetitionSearch): Observable<CompetitionInfo[]> {
    const params = search.search ? new HttpParams().append('search', search.search) : new HttpParams();
    return this.connector.get(`competitions?search=${search.search ? search.search : ''}`, params);
  }

  getCompeitionById(id: string): Observable<CompetitionDetails> {
    return this.connector.get(`competitions/${id}`);
  }

  getStandings(id: string): Observable<CompetitionStandingsRecord[]> {
    return this.connector.get(`competitions/${id}/standings`);
  }

  enterCompeition(id: string): Observable<CompetitionEntry> {
    return this.connector.post(`competitions/${id}/participate`, {});
  }

  leaveCompeition(id: string): Observable<void> {
    return this.connector.delete(`competitions/${id}/leave`);
  }
}
