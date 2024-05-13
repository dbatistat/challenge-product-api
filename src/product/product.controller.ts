import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ProductService } from './product.service'
import { Product } from './product.entity'
import { CreateOrUpdateProduct, FindProduct } from './product.interfaces'
import { Pagination } from '../util/utils'
import { AuthGuard } from '../auth/auth.guard'

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(
    @Body() createOrUpdateProduct: CreateOrUpdateProduct,
  ): Promise<Product> {
    const result = await this.productService.create(createOrUpdateProduct)

    return result
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createOrUpdateProduct: Partial<CreateOrUpdateProduct>,
  ): Promise<Product> {
    const result = await this.productService.update(id, createOrUpdateProduct)

    return result
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.productService.delete(id)
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Product> {
    const result = await this.productService.getById(id)

    return result
  }

  @Get('')
  async find(
    @Query() findProducts: Partial<FindProduct>,
  ): Promise<Pagination<Product>> {
    const result = await this.productService.find(findProducts)

    return result
  }
}
