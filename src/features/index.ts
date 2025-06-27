export { 
    calculateDeviceBatteryPercentageUsage,
    extractDistinctDevicesFromSchoolsAndCalculateData,
    calculateBatteryStats,
    calculateCummulativeAverage,
    calculateBatteryData
} 
from './dataAnalysis/lib/utility';

import FaultyDeviceTable from './ui/FaultyDeviceTable.vue';
import FileUploadView from './ui/FileUploadView.vue';

export { FaultyDeviceTable, FileUploadView };