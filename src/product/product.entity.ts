import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  handle: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  sku: string

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  grams: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  comparePrice: number

  @Column()
  stock: number

  @Column({ nullable: true })
  barcode: string
}
