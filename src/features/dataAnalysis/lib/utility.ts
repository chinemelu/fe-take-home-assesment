import  { extractUniqueDataAndObjectFromArray } from '../../../shared/index';
import  type { Battery } from '../../../shared/index';
import dayjs from 'dayjs';
import { SERIALNUMBER, ACADEMYID } from '../../../shared/index';

export const calculateDeviceBatteryPercentageUsage = (deviceData: Battery[]) => {
  let prevBatteryLevel = 0;
  let startTime = '';
  let endTime = '';
  let startBatteryLevel = 0;
  let cummulativeAverage = 0;
  let roundCount = 0;
  let isUnknown = false;
  deviceData.forEach((data, index) => {
    const currentBatteryLevel = data.batteryLevel;
    const currentTime = data.timestamp;
    if (index === 0) {
      startBatteryLevel = currentBatteryLevel;
      startTime = currentTime;
      isUnknown = deviceData.length === 1;
    }

    // start calculation
    if (index > 0) {
      if (prevBatteryLevel >= currentBatteryLevel) {
        // identify first and last dates
        if (index === deviceData.length - 1) {
          endTime = currentTime;
          prevBatteryLevel = currentBatteryLevel;
          roundCount += 1;
          cummulativeAverage = calculateCummulativeAverage({ endTime, startTime, startBatteryLevel, prevBatteryLevel, cummulativeAverage });
        }
      } else {
        endTime = deviceData[index - 1].timestamp;
        if (startTime !== endTime) {
          roundCount += 1;
          cummulativeAverage = calculateCummulativeAverage({ endTime, startTime, startBatteryLevel, prevBatteryLevel, cummulativeAverage });
        }
        // reset start time and startBatteryLevel
        startTime = currentTime;
        startBatteryLevel = currentBatteryLevel;
      }
    }

    prevBatteryLevel = currentBatteryLevel;
  });
  const result = cummulativeAverage/roundCount;

  return isUnknown ? 'unknown' : result;
};



export const extractDistinctDevicesFromSchoolsAndCalculateData = (schoolId, batteryData: Battery[]) => {
  const { extractedObject, unique } = extractUniqueDataAndObjectFromArray(batteryData, SERIALNUMBER);
  const uniqueDevices = unique;
  const uniqueDevicesAndSchoolsData = extractedObject;
  const schoolIdAndDevices = {
    name: '', bad_device_count: 0
  };
  const schoolsAndFaultyDevices = { name: '', faulty_devices: [], number_of_faulty_devices: 0 };
  let totalGoodCount = 0; let totalBadCount = 0;
  uniqueDevices.forEach(deviceId => {
    const batteryData = uniqueDevicesAndSchoolsData[deviceId];
    const averageDeviceBatteryUse = calculateDeviceBatteryPercentageUsage(batteryData);
    const { goodCount, badCount } = calculateBatteryStats(averageDeviceBatteryUse);
    schoolsAndFaultyDevices['name'] = schoolId;
    if (goodCount) totalGoodCount += goodCount;
    if (badCount) {
      totalBadCount += badCount;  
      schoolsAndFaultyDevices['faulty_devices'].push(deviceId);
      schoolsAndFaultyDevices['number_of_faulty_devices'] += 1;
    }
  });
  schoolIdAndDevices['name'] = schoolId;
  schoolIdAndDevices['bad_device_count'] = totalBadCount;

  return { schoolIdAndDevices, schoolsAndFaultyDevices };
};


export const calculateBatteryStats = (avgBatteryPercentage) => {
  let badCount = 0;
  let goodCount = 0;
  const batteryThresholdPercentage = 30;

  if (typeof avgBatteryPercentage === 'number') {
    if (avgBatteryPercentage <= batteryThresholdPercentage) {
      goodCount += 1;
    } else {
      badCount += 1;
    }
  }  

  return { goodCount, badCount };
};

interface CalculateCummulativeAverage {
  endTime: string;
  startTime: string;
  startBatteryLevel: number;
  prevBatteryLevel: number;
  cummulativeAverage: number;
}

export const calculateCummulativeAverage = ({ endTime, startTime, startBatteryLevel, prevBatteryLevel, cummulativeAverage }: CalculateCummulativeAverage): number => {
  const conversionValue = 24;
  const timeDiffInHours = dayjs(endTime).diff(dayjs(startTime), 'hour', true);
  const batteryDiff = (startBatteryLevel - prevBatteryLevel) * 100;
  const percentageBatteryDiff = ((conversionValue/timeDiffInHours) * batteryDiff);
  return cummulativeAverage + percentageBatteryDiff;
};

export const calculateBatteryData = (batteryData): { schoolIdAndDevicesArray: any, schoolsAndFaultyDevicesArray: any } => {
  const { extractedObject, unique } = extractUniqueDataAndObjectFromArray (batteryData, ACADEMYID);
    const uniqueSchools = unique;
    const uniqueSchoolsAndBatteryData = extractedObject;
    let schoolsAndFaultyDevicesArray = [];

  uniqueSchools.forEach(schoolId => {
    const { schoolIdAndDevices, schoolsAndFaultyDevices } = extractDistinctDevicesFromSchoolsAndCalculateData(schoolId, uniqueSchoolsAndBatteryData[schoolId]);
      schoolsAndFaultyDevicesArray.push(schoolsAndFaultyDevices);
  });

  schoolsAndFaultyDevicesArray = sortArraysInDescendingOrderOfFaultyDevices(schoolsAndFaultyDevicesArray, 'number_of_faulty_devices');
  return { schoolsAndFaultyDevicesArray };
};


export const sortArraysInDescendingOrderOfFaultyDevices = (array, key) => {
  return array.sort((a, b) => {
    const propertyA = a[key];
    const propertyB = b[key];
    if (propertyA < propertyB) {
      return 1;
    }
    if (propertyA > propertyB) {
      return -1;
    }
    return 0;
  });
};