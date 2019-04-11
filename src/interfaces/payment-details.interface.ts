import {AddressInterface} from "./address.interface";

export interface PaymentDetailsInterface {
    cardNumber: string;
    expiryDateMonth: string;
    expiryDateYear: string;
    cv2: string
    billingAddress?: AddressInterface;
}
