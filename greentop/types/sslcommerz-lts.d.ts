// types/sslcommerz-lts.d.ts
declare module 'sslcommerz-lts' {
  interface SSLCommerzPaymentOptions {
    store_id: string;
    store_passwd: string;
    is_live?: boolean;
  }

  interface SSLCommerzInitData {
    total_amount: number;
    currency: string;
    tran_id: string;
    success_url: string;
    fail_url: string;
    cancel_url: string;
    ipn_url: string;
    product_name: string;
    product_category?: string;
    product_profile?: string;
    cus_name?: string;
    cus_email?: string;
    cus_add1?: string;
    cus_city?: string;
    cus_country?: string;
    shipping_method?: string;
  }

  class SSLCommerzPayment {
    constructor(store_id: string, store_passwd: string, is_live?: boolean);
    init(data: SSLCommerzInitData): Promise<any>;
  }

  export default SSLCommerzPayment;
}
