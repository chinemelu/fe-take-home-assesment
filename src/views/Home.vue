<template>
    <div class="text-center">
      <FileUploader></FileUploader>

      <button class="rounded-full px-12 py-2 text-white bg-black mt-4">Upload</button>
    </div>
</template>

<script lang="ts" setup>
interface objType {
  'academyId':  string;
  'batteryLevel': number;
  'employeeId': string;
  'serialNumber': string;
  'timestamp': string;
}

interface index {
  [key: string]: objType[];
}

interface index2 {
  [key: number]: objType[];
}

interface index3 {
  [key: string]: index;
}


import { onMounted, ref } from 'vue';
import FileUploader from '@/components/FileUploader.vue';
import batteryJSON from '../data/battery.json'
import dayjs from 'dayjs';


const conversion = ref(24);
const result = {} as index;
const obj = {} as index;
const data: objType[] =  batteryJSON.data;

onMounted(() => {
  const uniqueNumbers = new Set<string>();

  // const obj = {} as index;

  data.forEach(t => {
    if (!uniqueNumbers.has(t.academyId)) {
      uniqueNumbers.add(t.academyId);
      obj[t.academyId] = [];
    }
  });

  data.forEach(t => {
    if (obj[t.academyId]) {
      obj[t.academyId].push(t);
    }
  });

  const finalDeviceResults = {} as index2;

  uniqueNumbers.forEach(num => {
    finalDeviceResults[num] = extractDistinctDevicesFromSchools(num, obj[num]);
  });

});


const extractDistinctDevicesFromSchools = (academyId: string, deviceData: objType[]) => {
  const uniqueDevices = new Set<string>();

  deviceData.forEach(t => {
    if (!uniqueDevices.has(t.serialNumber)) {
      uniqueDevices.add(t.serialNumber);
      result[t.serialNumber] = [] as objType[];
    }
  });

  deviceData.forEach(t => {
    if (result[t.serialNumber]) {
      result[t.serialNumber].push(t);
    }
  });

  let badCount = 0;
  let goodCount = 0;
  const academyIdAndDevices = {};
  const schoolsAndFaultyDevices = {
    academyId: []
  };
  uniqueDevices.forEach(deviceId => {
    const batteryData = result[deviceId];
    const batteryPercentage = calculateSchoolData(batteryData);
    if (batteryPercentage <= 30) {
      goodCount += 1;
    } else {
      schoolsAndFaultyDevices[academyId] = schoolsAndFaultyDevices['academyId'].push(deviceId);
      badCount += 1;
    }
    academyIdAndDevices[academyId] = { deviceSerialNumber: deviceId, goodCount, badCount };
  });

};

const calculateSchoolData = (deviceData: objType[]) => {
  let prevBatteryLevel = 0;
  let startTime = '';
  let endTime = '';
  let timeDiffInHours = 0;
  let startBatteryLevel = 0;
  let cummulativeAverage = 0;
  let batteryDiff = 0;
  let roundCount = 0;
  

  deviceData.forEach((data, index) => {
    const currentBatteryLevel = data.batteryLevel;
    const currentTime = data.timestamp;
    if (index === 0) {
      startBatteryLevel = currentBatteryLevel;
      startTime = currentTime;
    }

    // start calculation
    if (index > 0) {
      if (prevBatteryLevel >= currentBatteryLevel) {
        // identify first and last dates
        if (index === deviceData.length - 1) {
          endTime = currentTime;
          timeDiffInHours = dayjs(endTime).diff(dayjs(startTime), 'hour', true);
          roundCount += 1;
          batteryDiff = (startBatteryLevel - prevBatteryLevel) * 100;
          const percentageBatteryDiff = ((conversion.value/timeDiffInHours) * batteryDiff);
          cummulativeAverage += percentageBatteryDiff;
        }
      } else {
        endTime = deviceData[index - 1].timestamp;
        timeDiffInHours = dayjs(endTime).diff(dayjs(startTime), 'hour', true);

        if (timeDiffInHours > 0) {
          roundCount += 1;
          batteryDiff = (startBatteryLevel - prevBatteryLevel) * 100;
          const percentageBatteryDiff = ((conversion.value/timeDiffInHours) * batteryDiff);
          cummulativeAverage += percentageBatteryDiff;
        }

        // reset start time and startBatteryLevel
        startTime = currentTime;
        startBatteryLevel = currentBatteryLevel;
      }
    }

    prevBatteryLevel = currentBatteryLevel;
  });

  const result = cummulativeAverage/roundCount;

  return result;
};

</script>
