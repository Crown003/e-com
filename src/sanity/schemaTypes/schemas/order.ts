import { defineField, defineType } from "sanity";

export const shippingAddress = defineType({
    name: "shippingAddress",
    title: "Shipping Address",
    type: "object",
    fields: [
        defineField({
            name: "name",
            type: "string",
            title: "Name"
        }),
        defineField({
            name: "line1",
            title: "Address Line 1",
            type: "string"
        }),
        defineField({
            name: "line2",
            type: "string",
            title: "Address Line 2"
        }),
        defineField({
            name: "city",
            type: "string",
            title: "City"
        }),
        defineField({
            name: "state",
            type: "string",
            title: "State"
        }),
        defineField({
            name: "postalCode",
            type: "string",
            title: "Postal Code"
        }),
        defineField({
            name: "country",
            type: "string",
            title: "Country"
        }),
    ],
});

export const orderItem = defineType({
    name: "orderItem",
    title: "Order Item",
    type: "object",
    fields: [
        defineField({
            name: "product",
            type: "reference",
            to: [{ type: "product" }],
            title: "Product"
        }),
        defineField({
            name: "quantity",
            type: "number",
            title: "Quantity"
        }),
        defineField({
            name: "price",
            type: "number",
            title: "Price"
        }),
    ]
});

export const order = defineType({
    name: "order",
    title: "Order",
    type: "document",
    fields: [
        defineField({
            name: "orderNumber",
            type: "string",
            title: "Order Number"
        }),
        defineField({
            name: "orderDate",
            type: "datetime",
            title: "Order Date"
        }),
        defineField({
            name: "customerId",
            title: "Customer ID",
            type: "string"
        }),
        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string"
        }),
        defineField({
            name: "customerEmail",
            title: "Customer Email",
            type: "email"
        }),
        defineField({
            name: "striprCustomerId",
            type: "string",
            title: "Stripe Customer ID"
        }),
        defineField({
            name: "stripeCheckoutSessionId",
            title: "Stripe Checkout Session ID",
            type: "string"
        }),
        defineField({
            name: "stripePaymentIntentId",
            title: "Stripe Payment Intent ID",
            type: "string"
        }),
        defineField({
            name: "totalPrice",
            type: "number",
            title: "Total Price {INR}"
        }),
        defineField({
            name: "shippingAddress",
            type: "shippingAddress",
            title: "Shipping Address"
        }),
        defineField({
            name: "orderItems",
            title:"Order Items",
            type:"array",
            of:[{type:"orderItem"}]
        }),
        defineField({
            name: "status",
            type: "string",
            title: "Status",
            options: {
                list: [
                    { title: "Pending", value: "PENDING" },
                    { title: "Processing", value: "PROCESSING" },
                    { title: "Shipped", value: "SHIPPED" },
                    { title: "Delivered", value: "DELIVERED" },
                    { title: "Cancelled", value: "CANCELLED" },
                ]
            }
        })
    ]
})