export default function getRandomNumber (min: number, max: number): number {
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
}
