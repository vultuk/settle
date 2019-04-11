import {GatewayInterface, OptionsInterface, PaymentDetailsInterface} from "./interfaces";
import * as moment from 'moment';

export { AddressInterface, CountryInterface, GatewayInterface, GatewayOptionsInterface, OptionsInterface, PaymentDetailsInterface } from './interfaces';

export class Settle {

    constructor(
        protected readonly gateway: GatewayInterface,
        protected readonly options?: OptionsInterface,
    ) {}

    public async transact(value: number, from: PaymentDetailsInterface): Promise<boolean> {
        await this.validateCardDetails(from);

        return this.gateway.transact(value, from);
    }

    protected validateCardDetails(details: PaymentDetailsInterface): boolean {
        if (details.cv2.length !== 3) {
            throw Error(`CV2 length is invalid`);
        }

        if (details.cardNumber.length !== 16) {
            throw Error(`Card Number is invalid`);
        }

        if (`${details.expiryDateYear}${details.expiryDateMonth}` < moment().format('YYMM')) {
            throw Error(`Card has expired`);
        }

        if (this.gateway.getOption('addressRequired') === true && (!details.billingAddress || !details.billingAddress.postalCode)) {
            throw Error(`Address details not given`);
        }

        return true;
    }
}
