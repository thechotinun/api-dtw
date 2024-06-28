import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  community?: number;
}
