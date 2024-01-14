import { IsOptional, IsString, IsUrl } from 'class-validator';
import { Column } from 'typeorm';

export class CreateCategoryDto {
  @Column()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  image: string;
}
