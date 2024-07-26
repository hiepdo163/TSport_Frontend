export function formatPrice(num: number): string {
    // Convert number to string and split into integer and decimal parts
    const [integerPart, decimalPart] = num.toString().split('.');

    // Reverse the integer part for easier insertion of separators
    const reversedIntegerPart = integerPart.split('').reverse().join('');

    // Insert thousands separators
    const formattedReversedIntegerPart = reversedIntegerPart.match(/.{1,3}/g)?.join('.') || reversedIntegerPart;

    // Reverse back to original order
    const formattedIntegerPart = formattedReversedIntegerPart.split('').reverse().join('');

    // Combine integer and decimal parts if decimal part exists
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}