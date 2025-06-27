<template>
    <div class="p-6 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
      <div class="text-center">
        <FileUploader></FileUploader>

        <button class="rounded-full px-12 py-2 text-white bg-black mt-4">Upload</button>
      </div>
  </div>
</template>


<script setup lang="ts">
import { Loader, FileUploader } from '../../shared/index';
</script>