import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepo: Repository<Pokemon>,
  ) {}

  async findAll(page: number = 1, limit: number = 20) {
    const [data, total] = await this.pokemonRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async findByName(name: string) {
    const data = await this.pokemonRepo.find({
      where: { name: ILike(`%${name}%`) },
    });
    return { data, total: data.length };
  }
}
