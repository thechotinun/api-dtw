import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  community?: number;
}

export class CreateCommentDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MaxLength(100)
  text: string;
}
