import { Service } from 'typedi';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ProductCommandService } from '@/services/commands/ProductCommandService';

import type { IRestockAndSellRequest } from '@/types/product';

@Service()
export class SellController {
    constructor(private readonly productCommandService: ProductCommandService) {}

    async invoke(request: IRestockAndSellRequest, response: Response) {
        const {
            params: { id },
            body: { quantity }
        } = request;

        try {
            const updated = await this.productCommandService.sellProduct(id, quantity);

            if (!updated) {
                return response.sendStatus(StatusCodes.NOT_FOUND);
            }

            return response.sendStatus(StatusCodes.NO_CONTENT);
        } catch (error) {
            console.error('Error selling product:', error);

            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error selling product');
        }
    }
}
