import { isValidBatteryJSONData } from '../../entities/index';
import { calculateBatteryData } from '../../features/index';

self.onmessage = function(event){
    const batteryJSONData = event.data;

    const isValidBatteryJSON = isValidBatteryJSONData(batteryJSONData);

    if (isValidBatteryJSON) {
        const { schoolIdAndDevicesArray, schoolsAndFaultyDevicesArray } = calculateBatteryData(batteryJSONData.data);
        self.postMessage({ isValidBatteryJSON, schoolIdAndDevicesArray, schoolsAndFaultyDevicesArray });
    } else {
        self.postMessage({ isValidBatteryJSON });
    }
};