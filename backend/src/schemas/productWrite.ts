import { Schema } from 'mongoose';

import type { IProductWrite } from '@/types/mongo';

export const productWriteSchema = new Schema<IProductWrite>(
    {
        name: {
            type: String,
            required: true,
            maxLength: 50
        },
        description: {
            type: String,
            required: true,
            maxLength: 50
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price must be positive']
        },
        stock: {
            type: Number,
            required: true,
            min: [0, 'Price must be positive']
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);
