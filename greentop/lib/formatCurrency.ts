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
        console.error("Error formatting currency:", error);
        return `${amount} ${currency.toUpperCase()} ${amount.toFixed(2)}`;
    }
}