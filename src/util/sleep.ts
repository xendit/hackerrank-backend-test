export const sleep = async (ms: number): Promise<NodeJS.Timer> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
