import {PaymentDetailsInterface} from "./";

export interface GatewayInterface {
    getOption: (name: string) => any,
    transact: (value: number, from: PaymentDetailsInterface) => boolean,
}
