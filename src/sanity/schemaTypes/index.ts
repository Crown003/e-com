import { type SchemaTypeDefinition } from 'sanity'
import { promotionCode } from './schemas/product-code'
import { product } from './schemas/product.'
import { productCategory } from './schemas/product-category'
import { promotionCampaign } from './schemas/promotion-campaign'
import { shippingAddress, order, orderItem } from './schemas/order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [promotionCode,
          promotionCampaign,
          productCategory,
          product,
          
          shippingAddress,
          orderItem,
          order,

  ]
}
