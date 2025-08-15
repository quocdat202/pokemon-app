import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../../pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private apiUrl = 'http://localhost:4200/pokemon';

  constructor(private http: HttpClient) {}

  getFirst10Pokemons(
    page: number = 1,
    limit: number = 10
  ): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    );
  }
}
