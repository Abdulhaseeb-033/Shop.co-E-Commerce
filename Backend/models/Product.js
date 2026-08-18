import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        shortDescription: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        details: {
            material: {
                type: String,
                default: ""
            },

            fit: {
                type: String,
                default:""
            },

            origin: {
                type: String, 
                default: ""
            },

            care: {
                type: String,
                default: ""
            },

            pattern: {
                type: String,
                default: ""
            }
        },

        price: {
            type: Number,
            required: true
        },

        discount: {
            type: Number,
            default: 0
        },

        category: {
            type: String,
            required: true
        },

        dressStyle: {
            type: String,
            required:true
        },

        images: {
            type: [String],
            required: true
        },

        colors: {
            type: [String],
            default: [] 
        },

        sizes: {
            type:[String],
            default: []
        },

        stock: {
            type: Number,
            default: 0
        },

        isNewArrival: {
            type: Boolean,
            default: false
        },

        isTopSelling: {
            type: Boolean,
            default: false
        },

        rating: {
            type: Number,
            default: 0
        },

        reviews:[
            {
                name: String,
                rating: Number,
                comment: String,
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        faqs: [
            {
               question: {
                type: String,
                required: true
               },

               answer: {
                type: String,
                required: true
               }
            }
        ]

    },

    {
        timestamps: true
    }
);

const Product = mongoose.model("Product",productSchema);

export default Product;