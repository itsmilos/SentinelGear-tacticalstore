export default function getShipping(country: string) {
    switch (country) {
        case "ba":
            return 5;
        case "hr":
            return 7;
        case "de":
            return 10;
        case "us":
            return 25;
        default:
            return 10;
    }
}
