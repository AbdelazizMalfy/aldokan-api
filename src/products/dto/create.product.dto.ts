import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Column } from 'typeorm';

enum UnitType {
  ITEM = 'item',
  WEIGHT = 'weight',
}

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  readonly categoryId: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  readonly stockQuantity: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsEnum(UnitType)
  readonly unitType: 'item' | 'weight';

  @IsOptional()
  @IsString()
  readonly weightPerUnit: '500g' | null;
}
