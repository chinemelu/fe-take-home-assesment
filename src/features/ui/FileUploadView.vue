<template>
    <div class="p-6 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
      <div class="text-right">
         <button v-if="chartData?.length > 0" @click="emit('clear-chart-data')" type="button" class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
      </div>
      <h3 class="text-center font-medium text-lg mb-none" v-if="chartData?.length > 0">Click on the top right x icon to clear the chart data</h3>

      <Alert :type="alertType" :alertText="alertMessage" @dismiss-alert="emit('set-alert-state', false)" v-if="showAlert" />
      <div class="text-center">
        <FileUploader @click="handleClick" @change="handleFileSelect"></FileUploader>

        <div 
          style="min-width: 100px; width: 400px; border-radius: 8px" 
          :class="[selectedFileName ? 'bg-sky-100' : '', 'mx-auto my-auto mt-4 p-4 flex justify-between items-center text-dark font-bold']" 
        >
          <span>{{ selectedFileName }}</span>
          <span @click="clearFileSelection" style="cursor: pointer" :class="[!selectedFileName ? 'hidden' : '', 'text-lg']" >x</span>
        </div>

        <button 
          :disabled="!selectedFileName || isLoading" 
          :class="[!selectedFileName ? 'bg-gray-300': 'bg-black' ,'mx-auto my-auto flex items-center rounded-full px-12 py-2 text-white mt-4 text-lg']"
          @click="sendFileForProcessing"
        >
          Process Data
          <Loader v-if="isLoading" />
        </button>
      </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import { Loader, FileUploader, Alert } from '../../shared/index';
import type { AlertType } from '../../shared/index';


const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true
  },
  isProcessingComplete: {
    type: Boolean,
    default: false
  },
  chartData: {
    type: Array,
    default: () => []
  },
  alertMessage: {
    type: String,
    default: ''
  },
  alertType: {
    type: String
  },
  showAlert: {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits(['file-processing', 'clear-chart-data', 'update-processing-state', 'set-alert-state']);

const selectedFile = ref<FileList[]>([]);
const selectedFileName = ref('');

const handleClick = (e: Event) => {
  if (e.target.value) {
    e.target.value = null;
  }
};

const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement;  
  selectedFile.value = input.files[0];
  selectedFileName.value = selectedFile.value.name;
  emit('update-processing-state', false);
};

const clearFileSelection = () => {
  selectedFile.value = null;
  selectedFileName.value = '';
};

const sendFileForProcessing = () => {
  fetchFileContent(selectedFile.value, emitFileContent);
};

const emitFileContent = (fileContent) => {
  emit('file-processing', fileContent);
};

const fetchFileContent = (file, cb) => {
  const reader = new FileReader();
  let fileContent;
  reader.onload = function(e) {
      fileContent =  e.target.result; // The content of the file
      cb(fileContent);
  };

  reader.onerror = function(e) {
      console.error("Error reading file:", e.target.error);
  };

  reader.readAsText(file); // Read the file as text
};

watch(() => props.isProcessingComplete, (newValue) => {
  if (newValue) {
    clearFileSelection();
  }
});
</script>