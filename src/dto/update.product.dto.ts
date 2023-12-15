//TODO: add validations

export class UpdateProductDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stockQuantity: number;
  readonly unitType: 'item' | 'weight';
  readonly weightPerUnit: '500g' | null;
}
