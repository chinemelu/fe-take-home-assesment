<template>
    <div id="alert-1 text-center" :class="[ type ? typeClasses[type] : '', 'flex items-center p-4 mb-4 dark:bg-gray-800 rounded-lg']" role="alert">
        <span class="sr-only">{{ type }}</span>
        <div class="ms-3 text-sm font-medium w-full text-center">
           {{ alertText }}
        </div>
        <button @click="emit('dismiss-alert')" type="button" class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>
</template>


<script setup lang="ts">
    import { computed } from 'vue';

    export type AlertType = 'error' | 'success' | 'info'


    const emit = defineEmits(['dismiss-alert']);

    const typeClasses = computed(() => ({
        info: 'bg-blue-50 dark:text-blue-400 text-blue-800',
        error: 'text-red-800 bg-red-50 dark:text-red-400',
        success: 'text-green-800 bg-green-50  dark:text-green-400'
    }));

   defineProps<({
        type: {
            type: Type,

        },
        alertText: {
            type: string
        }
    })>();

</script>