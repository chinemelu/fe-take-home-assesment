export const instantiateWebWorker = (webWorkerFile: string) => {
    if (window.Worker) {
        const worker = new Worker(webWorkerFile, { type: 'module' });
        return worker;
    }
    return null;
};
