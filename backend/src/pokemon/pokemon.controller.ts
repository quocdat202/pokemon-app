import { Controller, Get, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getPokemonList(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.pokemonService.findAll(Number(page), Number(limit));
  }

  @Get('search')
  searchPokemon(@Query('name') name: string) {
    return this.pokemonService.findByName(name);
  }
}
