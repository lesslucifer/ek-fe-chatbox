export class Hera {
    static parseInt(val: any, radix?: number, defaultVal?: number): number {
        const n = parseInt(val, radix);
        if (isNaN(n)) {
            return defaultVal!;
        }

        return n;
    }
}