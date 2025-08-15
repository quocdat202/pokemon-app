import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon-list.service';
import { Pokemon } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  csvFile: File | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getFirst10Pokemons().subscribe((data) => {
      this.pokemons = data;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.csvFile = file;
      // Xử lý file CSV ở đây
    }
  }
}
