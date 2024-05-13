import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column()
  @ApiProperty()
  handle: string

  @Column()
  @ApiProperty()
  title: string

  @Column()
  @ApiProperty()
  description: string

  @Column()
  @ApiProperty()
  sku: string

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty()
  grams: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty()
  price: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty()
  comparePrice: number

  @Column()
  @ApiProperty()
  stock: number

  @Column({ nullable: true })
  @ApiProperty()
  barcode: string
}
