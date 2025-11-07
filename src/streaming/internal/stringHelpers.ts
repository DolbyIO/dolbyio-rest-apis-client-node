type Dict<T> = { [key: string]: T };

export function toDictString(obj: Record<string, any>): Dict<string> {
    const result: Dict<string> = {};
    for (const [key, value] of Object.entries(obj)) {
        result[key] = String(value); // Ensure all values are converted to strings
    }
    return result;
}
