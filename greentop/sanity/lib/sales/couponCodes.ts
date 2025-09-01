export const COUPON_CODES={
    BRIKKHOROPON: "JULY_20",
    XMAS2021: "XMAS",
    NY2022: "NY2022",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;

export default COUPON_CODES;