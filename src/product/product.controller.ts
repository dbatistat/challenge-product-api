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
import { CreateOrUpdateProduct } from './product.interfaces'
import { Pagination } from '../util/utils'
import { AuthGuard } from '../auth/auth.guard'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateOrUpdateProductDto } from './dto/create-or-update-product.dto'
import { FindProductDto } from './dto/find-product.dto'

@Controller('product')
@ApiTags('product')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Product created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createOrUpdateProduct: CreateOrUpdateProductDto,
  ): Promise<Product> {
    const result = await this.productService.create(createOrUpdateProduct)

    return result
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'Product updated',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: number,
    @Body() createOrUpdateProduct: Partial<CreateOrUpdateProduct>,
  ): Promise<Product> {
    const result = await this.productService.update(id, createOrUpdateProduct)

    return result
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'Product deleted',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Param('id') id: number): Promise<void> {
    await this.productService.delete(id)
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Valid product',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getById(@Param('id') id: number): Promise<Product> {
    const result = await this.productService.getById(id)

    return result
  }

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'Valid products',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async find(
    @Query() findProducts: FindProductDto,
  ): Promise<Pagination<Product>> {
    const result = await this.productService.find(findProducts)

    return result
  }
}
