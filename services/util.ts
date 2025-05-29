export const debounceFunc = (func: () => void, delay: number) => {
    let timeoutId: number | null = null;
    return () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(func, delay);
    };
};