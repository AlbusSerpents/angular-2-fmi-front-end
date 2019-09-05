import { Injectable } from '@angular/core';
import { ConnectorService } from 'src/app/core/http/connector.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ProblemsService {

  constructor(private connector: ConnectorService) { }

  listProblems(search: ProblemSearch): Observable<ProblemInfo[]> {
    const params = search.search ? new HttpParams().append('search', search.search) : new HttpParams();
    return this.connector.get(`problems?search=${search.search ? search.search : ''}`, params);
  }

  getProblemDetails(id: string): Observable<ProblemDetails> {
    return this.connector.get(`problems/${id}`);
  }

  createProblem(request: CreateProblemRequest): Observable<CreateProblemResponse> {
    return this.connector.post('problems', request);
  }

  updateProblem(id: string, request: CreateProblemRequest): Observable<void> {
    return this.connector.put(`problems/${id}`, request);
  }

  deleteProblem(id: string): Observable<void> {
    return this.connector.delete(`problems/${id}`);
  }

  getTests(id: string): Observable<ProblemTest[]> {
    return this.connector.get(`problems/${id}/tests`);
  }
}
