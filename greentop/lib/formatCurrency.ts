export function formatCurrency(
    amount:number,
    currency:string ="GBP",
): string {
    try {
        return new Intl.NumberFormat("en-GB",{
            style: "currency",
            currency: currency.toUpperCase(),
        }).format(amount);
    } catch (error) {
        console.error("Invalid currency code:", currency, error);
        return ` ${currency.toUpperCase()} ${amount.toFixed(2)}`;
    }
}