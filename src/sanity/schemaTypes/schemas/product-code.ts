import { defineField ,defineType } from "sanity";



export const promotionCode = defineType({
    name:'promotionCode',
    title: 'PromotionCode',
    type: 'document',
    fields : [
        defineField({
            name: 'code',
            title: 'Code',
            type: 'string',
        }),
        defineField({
            name: 'discountPercentage',
            title: 'Discount Percentage',
            type: 'number',
        }),
        defineField({
            name: 'expirationDate',
            title: 'Expiration Date',  
            type: 'date',
        })
    ]
})