<template>
  <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow-sm sm:flex dark:divide-gray-700 dark:text-gray-400">
      <li class="w-full focus-within:z-10" @click="toggleComponent(FileUploadView)">
          <a href="#" 
            :class="[currentComponent === FileUploadView ? 'text-gray-900 bg-gray-100 rounded-s-lg active dark:text-white dark:bg-gray-700' : ' bg-white border-r hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700 dark:bg-gray-800', 'inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none']" :aria-current="currentComponent === FileUploadView"
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
            :class="[currentComponent === SchoolsTotalFaultyDeviceTable ? 'text-gray-900 bg-gray-100 rounded-s-lg active dark:text-white dark:bg-gray-700' : ' bg-white border-r hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700 dark:bg-gray-800', 'inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none']" :aria-current="currentComponent === SchoolsTotalFaultyDeviceTable"
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
            :class="[currentComponent === FaultyDeviceTable ? 'text-gray-900 bg-gray-100 rounded-s-lg active dark:text-white dark:bg-gray-700' : ' bg-white border-r hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700 dark:bg-gray-800', 'inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none']" :aria-current="currentComponent === FaultyDeviceTable"
          >
            Faulty Device Table
          </a>
      </li>
  </ul>
  
  <transition name="fade">
    <component 
      :is="currentComponent" 
      :chartData="chartData"
      @clear-chart-data="chartData = []"
      @update-processing-state="(value: boolean) => isProcessingComplete = value"
      @file-processing="setSelectedFile"
      :isLoading="isLoading"
      :alertType="alertType"
      :alertMessage="alertMessage"
      :showAlert="showAlert"
      @set-alert-state="(value: boolean) => showAlert = value"
      :isProcessingComplete="isProcessingComplete"
    />
  </transition>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import { instantiateWebWorker, DATA_ANALYSIS_WORKER_FILE } from '../../../shared/index';
import { instantiateWebWorkerAndReturnChartDataViaMainThread } from '../../../features/index';
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

const isLoading = ref(false);
const isProcessingComplete = ref(false);
const chartData = ref([]);
const alertType = ref('success');
const alertMessage = ref('');
const showAlert = ref(false);

const currentComponent = shallowRef(FileUploadView);


const toggleComponent = (component) => {
  currentComponent.value = component;
};


const setSelectedFile = (fileContent: { data: battery[] }) => {
  try {
    isLoading.value = true;
    const batteryData = JSON.parse(fileContent);

    const worker = instantiateWebWorker(DATA_ANALYSIS_WORKER_FILE);
    
    if (worker) {
      worker.postMessage(batteryData);
      worker.onmessage = (event) => {
        const { isValidBatteryJSON, schoolsAndFaultyDevicesArray } = event.data;    
        worker.terminate();

        if (isValidBatteryJSON) {
          isLoading.value = false;
          isProcessingComplete.value = true;
          alertType.value = 'success';
          alertMessage.value = 'The JSON Data has been processed successfully. Check the tables for the results';
          showAlert.value = true;
        } else {
          alertType.value = 'error';
          alertMessage.value = 'The JSON data is invalid. It must be a JSON with a data property. Check that all the properties are present in all the datasets';
          showAlert.value = true;
          isLoading.value = false;
        }

        chartData.value = schoolsAndFaultyDevicesArray;
      };
      
      worker.onerror = function(e){
        throw new Error(e.message + ' (' + e.filename + ':' + e.lineno + ')');
      };
    } else {
      const { isValidBatteryJSON, schoolsAndFaultyDevicesArray } = instantiateWebWorkerAndReturnChartDataViaMainThread(batteryData);
      if (isValidBatteryJSON) {
        isLoading.value = false;
        isProcessingComplete.value = true;
        alertType.value = 'success';
        alertMessage.value = 'The JSON Data has been processed successfully. Check the tables for the results';
        showAlert.value = true;
      } else {
          alertType.value = 'error';
          alertMessage.value = 'The JSON data is invalid. It must be a JSON with a data property. Check that all the properties are present in all the dataset';
          showAlert.value = true;
          isLoading.value = false;
      }

      chartData.value = schoolsAndFaultyDevicesArray;
    }
  } catch(error) {
    alertType.value = 'error';
    alertMessage.value = error;
    showAlert.value = true;
  }
};

</script>


<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>