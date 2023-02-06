import { Injectable, Logger } from '@nestjs/common';
import { Recipe } from './recipe.entity';
import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { RecipeDto } from './recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectInMemoryDBService('recipe')
    private readonly db: InMemoryDBService<Recipe>,
  ) {
    this.db.create({
      name: '🍲 Ciorba radauteana',
      description:
        'Pentru prepararea unei ciorbe traditionale radautene trebuie sa transezi puiul cumparat in bucati medii, desprinzand aripile si pulpele si, daca vrei, poti scoate in prealabil oasele si poti desprinde spatele de piept. Mai apoi, trebuie sa cureti zarzavaturile si sa le speli, dupa care sa tai bucatele morcovii, iar restul legumelor se taie in bucati mari sau se lasa intregi dupa care se scot din ciorba. ',
    });
  }
  async findAll(): Promise<Recipe[]> {
    const recipes = this.db.getAll();
    return recipes;
  }

  async save(recipeDto: RecipeDto): Promise<Recipe> {
    const recipe = this.db.create({
      name: recipeDto.name,
      description: recipeDto.description,
    });
    return recipe;
  }

  async remove(id: string) {
    // const recipe = this.db.query((recipe) => recipe.name == name)[0];
    this.db.delete(id);
  }
}
