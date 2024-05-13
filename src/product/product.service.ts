import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { Product } from './product.entity'
import { CreateOrUpdateProduct, FindProduct } from './product.interfaces'
import { ProductNotExistException } from './exceptions/product-not-exist.exception'
import { Pagination } from '../util/utils'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private usersRepository: Repository<Product>,
  ) {}

  async getByIdOrFail(id: number): Promise<Product> {
    const result = await this.usersRepository.findOne({ where: { id } })

    if (result == null) {
      throw new ProductNotExistException()
    }

    return result
  }

  async getById(id: number): Promise<Product> {
    const result = await this.usersRepository.findOne({ where: { id } })

    return result
  }

  async create(create: CreateOrUpdateProduct): Promise<Product> {
    const result = await this.usersRepository.save(create)

    return result
  }

  async update(
    id: number,
    update: Partial<CreateOrUpdateProduct>,
  ): Promise<Product> {
    const productExist = await this.getByIdOrFail(id)

    const result = await this.usersRepository.save({
      ...productExist,
      ...update,
    })

    return result
  }

  async delete(id: number): Promise<void> {
    const productExist = await this.getByIdOrFail(id)
    await this.usersRepository.delete(id)
  }

  async find(findProducts: Partial<FindProduct>): Promise<Pagination<Product>> {
    const { take, skip, filter } = findProducts

    const where = []
    if (filter) {
      where.push({ handle: Like(`%${filter}%`) })
      where.push({ title: Like(`%${filter}%`) })
      where.push({ sku: Like(`%${filter}%`) })
      where.push({ grams: Like(`%${filter}%`) })
      where.push({ price: Like(`%${filter}%`) })
      where.push({ comparePrice: Like(`%${filter}%`) })
      where.push({ stock: Like(`%${filter}%`) })
      where.push({ barcode: Like(`%${filter}%`) })
    }

    const [data, total] = await this.usersRepository.findAndCount({
      where: [...where],
      order: { id: 'ASC' },
      take: take | 10,
      skip: skip | 0,
    })

    return {
      data,
      total,
    }
  }
}
