const instantiateWebWorkers = (webWorkerFile: string) => {
    if (window.Worker) {
        const worker = new Worker(webWorkerFile);
    }
};
