<template>
  <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow-sm sm:flex dark:divide-gray-700 dark:text-gray-400">
      <li class="w-full focus-within:z-10" @click="toggleComponent(FileUploadView)">
          <a href="#" 
            class="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page"
          >
            File Upload
          </a>
      </li>
      <li 
        class="w-full focus-within:z-10"
        @click="toggleComponent(SchoolsTotalFaultyDeviceTable)"
      >
          <a 
            href="#" 
            class="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            School Data Chart
          </a>
      </li>
      <li 
        class="w-full focus-within:z-10"
        @click="toggleComponent(FaultyDeviceTable)"  
      >
          <a 
            href="#" 
            class="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            Faulty Device Table
          </a>
      </li>
  </ul>
  
  <transition name="fade">
    <component 
      :is="currentComponent" 
      :chartData="chartData"
    />
  </transition>
</template>

<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue';
import type { Battery } from '../../../shared/index';
import { batteryConfigData, isValidBatteryJSONData } from '../../../entities/index';
import { DATA_ANALYSIS_WORKER_FILE } from '../../../shared/index';
import { calculateBatteryData } from '../../../features/index';
import { instantiateWebWorker } from '../../../shared/index';
import { defineAsyncComponent } from 'vue';

const FaultyDeviceTable = defineAsyncComponent(() =>
  import('../../../features/ui/FaultyDeviceTable.vue')
);

const FileUploadView = defineAsyncComponent(() =>
  import('../../../features/ui/FileUploadView.vue')
);

const SchoolsTotalFaultyDeviceTable = defineAsyncComponent(() =>
  import('../../../features/ui/SchoolsTotalFaultyDevices.vue')
);

const batteryData: { data: Battery[] } =  batteryConfigData;
const isLoading = ref(false);
const chartData = ref([]);

const currentComponent = shallowRef(FileUploadView);


const toggleComponent = (component) => {
  currentComponent.value = component;
};

onMounted(() => {
  const worker = instantiateWebWorker(DATA_ANALYSIS_WORKER_FILE);

  if (worker) {
    isLoading.value = true;

    worker.postMessage(batteryData);

    worker.onmessage = (event) => {
      const { isValidBatteryJSON, schoolsAndFaultyDevicesArray } = event.data;

      if (isValidBatteryJSON) {
        chartData.value = schoolsAndFaultyDevicesArray;
      } else {
        console.log('invalid data');
      }
      worker.terminate();
      isLoading.value = false;
    };

    worker.onerror = function(e){
      throw new Error(e.message + ' (' + e.filename + ':' + e.lineno + ')');
    };
  } else { 
    isLoading.value = true;
    const isValidJSONData = isValidBatteryJSONData(batteryData);

    if (isValidJSONData) {
      const { schoolsAndFaultyDevicesArray } = calculateBatteryData(batteryData.data);
      chartData.value = schoolsAndFaultyDevicesArray;
    }
    isLoading.value = false;
  }

});

</script>


<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>