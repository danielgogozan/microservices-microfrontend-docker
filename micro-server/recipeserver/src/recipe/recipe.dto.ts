import { IsString } from 'class-validator';

export class RecipeDto {
  @IsString() name: string;
  @IsString() description: string;
}
