import { expect, describe, it } from 'vitest';
import { calculateDeviceBatteryPercentageUsage } from '../index';

describe('Results of analysing two data sets', () => {
    const batteryData = [
        {
            'academyId': 30006,
            'batteryLevel': 1.00,
            'employeeId': 'T1007384',
            'serialNumber': '1805C67HD02259',
            'timestamp': '2019-05-17T09:00:00.0+01:00'
        },
        {
            'academyId': 30006,
            'batteryLevel': 0.90,
            'employeeId': 'T1007384',
            'serialNumber': '1805C67HD02259',
            'timestamp': '2019-05-17T21:00:00.0+01:00'
        },
       
    ];
    it('it should return the right value when two datasets are used in batteryData', () => {
        expect (calculateDeviceBatteryPercentageUsage(batteryData)).toBeCloseTo(20);
    });
});

describe('Result of analysing 3 data sets', () => {
    const batteryData = [
        {
            'academyId': 30006,
            'batteryLevel': 1.00,
            'employeeId': 'T1007384',
            'serialNumber': '1805C67HD02259',
            'timestamp': '2019-05-17T09:00:00.0+01:00'
        },
        {
            'academyId': 30006,
            'batteryLevel': 0.90,
            'employeeId': 'T1007384',
            'serialNumber': '1805C67HD02259',
            'timestamp': '2019-05-17T21:00:00.0+01:00'
        },
        {
            'academyId': 30006,
            'batteryLevel': 0.80,
            'employeeId': 'T1007384',
            'serialNumber': '1805C67HD02259',
            'timestamp': '2019-05-18T21:00:00.0+01:00'
        }
    ];
    it('it should return the right value when three datasets are used in batteryData', () => {
        expect (calculateDeviceBatteryPercentageUsage(batteryData)).toBeCloseTo(13.3, 1);
    });
});
describe('Result of analysing 4 data sets', () => {
    it('it should not increase the battery use percentage when there is an increased battery charge', () => {
         const batteryData = [
            {
                'academyId': 30006,
                'batteryLevel': 1.00,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-17T09:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 0.90,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-17T21:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 0.80,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-18T21:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 1.00,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-18T22:00:00.0+01:00'
            }
        ];
        expect (calculateDeviceBatteryPercentageUsage(batteryData)).toBeCloseTo(13.3, 1);
    });
});
describe('Result of analysing one dataset', () => {
    const batteryData = [
        {
            'academyId': 30006,
            'batteryLevel': 1.00,
            'employeeId': 'T1007384',
            'serialNumber': '1805C67HD02259',
            'timestamp': '2019-05-17T09:00:00.0+01:00'
        }
    ];
    it('it should return unknown when one dataset is used in batteryData', () => {
        expect (calculateDeviceBatteryPercentageUsage(batteryData)).toBe('unknown');
    });
});
describe('Result of analysing increased battery charge(s) after decreasing battery charge(s) and subsequent average values', () => {
     it('it should return the average of the 2 different sets of data from decreased charge to increased charge', () => {
         const batteryData = [
            {
                'academyId': 30006,
                'batteryLevel': 1.00,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-17T09:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 0.90,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-17T21:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 1.00,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-18T09:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 0.30,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-18T12:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 0.20,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-18T18:00:00.0+01:00'
            }
        ];
        expect (calculateDeviceBatteryPercentageUsage(batteryData)).toBeCloseTo(116.7, 1);
    });
     it('it should return the average of the 3 different sets of data from decreased charge to increased charge', () => {
         const batteryData = [
            {
                'academyId': 30006,
                'batteryLevel': 1.00,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-17T09:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 0.90,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-17T21:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 1.00,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-18T09:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 0.30,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-18T12:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 0.20,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-18T18:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 0.50,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-18T20:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 0.20,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-19T02:00:00.0+01:00'
            },
            {
                'academyId': 30006,
                'batteryLevel': 0.05,
                'employeeId': 'T1007384',
                'serialNumber': '1805C67HD02259',
                'timestamp': '2019-05-19T10:00:00.0+01:00'
            }
            // 14 hrs - 45%
            // 24 hrs - 77.14%

            // 213.33% 
            // 20%
        ];
        expect (calculateDeviceBatteryPercentageUsage(batteryData)).toBeCloseTo(103.5, 1);
    });
});