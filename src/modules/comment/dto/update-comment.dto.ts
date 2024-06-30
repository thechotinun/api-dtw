import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @MaxLength(100)
  text: string;
}
