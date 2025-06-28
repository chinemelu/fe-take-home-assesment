<template>
    <div class="relative overflow-x-auto mt-12">
    <h1 class="text-3xl mb-8 text-center font-medium" v-if="chartData?.length > 0">Schools and Total Faulty Devices</h1>        
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" v-if="chartData?.length > 0">
            <thead class="text-sm text-gray-700 uppercase bg-gray-50 text-center dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        S/N
                    </th>
                    <th scope="col" class="px-6 py-3">
                        School ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Faulty Devices
                    </th>
                    <th scope="col" class="px-6 py-3 font-bold">
                        Number of Faulty Devices
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center" v-for="(data, index) in chartData" :key="index">
                    <th scope="row" class="w=1/3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/4">
                        {{ index +  1 }}
                    </th>
                    <td class="px-6 py-4 w-1/4">
                        {{ data.name  }}
                    </td>
                    <td class="px-6 py-4 w-1/4 font-black">
                        {{ !data.faulty_devices.length ? 'NULL' : data.faulty_devices.join(', ')  }}
                    </td>
                    <td class="px-6 py-4 font-black w-1/4 font-medium">
                        {{ data.number_of_faulty_devices }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="text-center w-full">
            <h3 class="text-xl font-bold text-center">There is no data here. Upload a JSON file for processing</h3>
            <img class="inline" :src="emptyState" style="width: 400px; height: 400px; object-fit: cover" alt="no-data"/>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { emptyState } from '../../shared/index';
   defineProps<({
        chartData: {
            type: Array<{
                name: string;
                faulty_devices: Array<number>;
                number_of_faulty_devices: number
            }>,
            default: () => []
        }
    })>();
</script>