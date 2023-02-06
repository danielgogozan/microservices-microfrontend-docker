import {
  Controller,
  UseGuards,
  Get,
  Delete,
  Param,
  Post,
  Body,
  Inject,
  Logger,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { MyAuthGuard } from '../guard/MyAuthGuard';
import { RecipeDto } from './recipe.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firestore } from 'firebase-admin';
import DocumentSnapshot = firestore.DocumentSnapshot;
import QuerySnapshot = firestore.QuerySnapshot;

@Controller('recipes')
export class RecipeController {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  constructor(
    private readonly recipeService: RecipeService,
    @Inject('USER_CLIENT') private readonly client: ClientProxy,
  ) {
    this.collection = firestore().collection('favoriteRecipes');
  }
  @UseGuards(MyAuthGuard)
  @Get('')
  async getAllRecipes(): Promise<Recipe[]> {
    Logger.log('Getting all recipes...');
    return this.recipeService.findAll();
  }

  @UseGuards(MyAuthGuard)
  @Get('trending')
  async getAllTrendingRecipes(): Promise<Recipe[]> {
    Logger.log('Getting all trending recipes...');

    return this.collection
      .get()
      .then((querySnapshot: QuerySnapshot<Recipe>) => {
        if (querySnapshot.empty) {
          return [];
        }

        const recipes: Recipe[] = [];
        for (const doc of querySnapshot.docs) {
          recipes.push(this.convertToRecipe(doc));
        }

        return recipes;
      });
  }

  @UseGuards(MyAuthGuard)
  @Post('save')
  async save(@Body() recipeDto: RecipeDto): Promise<Recipe> {
    const recipe = this.recipeService.save(recipeDto);
    Logger.log('New recipe saved');
    this.client.emit('recipe-saved-event', { name: recipeDto.name });
    return recipe;
  }

  @UseGuards(MyAuthGuard)
  @Delete('delete/:id')
  async deleteRecipe(@Param('id') id: string) {
    await this.recipeService.remove(id);
    Logger.log('Recipe deleted');
  }

  private convertToRecipe(querySnapshot: DocumentSnapshot<Recipe>) {
    if (!querySnapshot.exists) {
      console.log(`no recipes found with the given id`);
    }

    const todo = querySnapshot.data();
    console.log('DATA: ', querySnapshot.data());

    return {
      id: querySnapshot.id,
      name: todo.name,
      description: todo.description,
    };
  }
}
