export interface CreateOrUpdateProduct {
  handle: string
  title: string
  description: string
  sku: string
  grams: number
  price: number
  comparePrice: number
  stock: number
  barcode?: string
}

export interface FindProduct {
  take: number
  skip: number
  handle: string
  title: string
  sku: string
  grams: number
  price: number
  comparePrice: number
  stock: number
  barcode: string
}
