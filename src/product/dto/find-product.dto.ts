import { ApiProperty } from '@nestjs/swagger'

export class FindProductDto {
  @ApiProperty()
  take: number

  @ApiProperty()
  skip: number

  @ApiProperty()
  filter: string
}
