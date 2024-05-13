import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateOrUpdateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  handle: string

  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsString()
  @ApiProperty()
  description: string

  @IsNotEmpty()
  @ApiProperty()
  sku: string

  @IsNotEmpty()
  @ApiProperty()
  grams: number

  @IsNotEmpty()
  @ApiProperty()
  price: number

  @IsNotEmpty()
  @ApiProperty()
  comparePrice: number

  @IsNotEmpty()
  @ApiProperty()
  stock: number

  @IsNotEmpty()
  @ApiProperty()
  barcode?: string
}
