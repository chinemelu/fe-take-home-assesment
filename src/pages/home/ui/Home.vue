<template>
    <div class="text-center">
      <FileUploader></FileUploader>

      <button class="rounded-full px-12 py-2 text-white bg-black mt-4">Upload</button>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import type { Battery } from '../../../shared/index';
import { FileUploader } from '@/widgets/index';
import { batteryConfigData } from '../../../entities/index';
import { extractUniqueDataAndObjectFromArray } from '../../../shared/index';
import { ACADEMYID } from '../../../shared/index';
import { extractDistinctDevicesFromSchoolsAndCalculateData } from '../../../features/index';

const batteryData: Battery[] =  batteryConfigData.data;

onMounted(() => {
  const { extractedObject, unique } = extractUniqueDataAndObjectFromArray (batteryData, ACADEMYID);
  const uniqueSchools = unique;
  const uniqueSchoolsAndBatteryData = extractedObject;
  
  uniqueSchools.forEach(schoolId => {
    extractDistinctDevicesFromSchoolsAndCalculateData(schoolId, uniqueSchoolsAndBatteryData[schoolId]);
  });

});

</script>
