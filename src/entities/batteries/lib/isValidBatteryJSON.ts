import type { Battery } from '../../../shared/index';

export const isValidBatteryJSONData = (batteryJSONData: { data: Battery[] }) => {
  const isJSONDataObject = typeof batteryJSONData === 'object' && !Array.isArray(batteryJSONData) && batteryJSONData !== null;
  const JSONHasDataPropertyWhichIsAnArray = !!batteryJSONData.data && Array.isArray(batteryJSONData.data);
  if (!isJSONDataObject) {
    return false;
  }
  if (!JSONHasDataPropertyWhichIsAnArray) {
    return false;
  } 
  const isValidBatteryJSON = allJSONArrayDataSetsAreValid(batteryJSONData.data);
  
  return isValidBatteryJSON;
};

const allJSONArrayDataSetsAreValid = (JSONArrayDataset: Battery[]) => {
    return JSONArrayDataset.every(data => !!data.timestamp && !!data.academyId && !!data.batteryLevel && !!data.serialNumber);
};