import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum UnitType {
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

  @IsNotEmpty()
  @IsEnum(UnitType)
  readonly unitType: 'item' | 'weight';

  @IsOptional()
  @IsString()
  readonly weightPerUnit: '500g' | null;
}
