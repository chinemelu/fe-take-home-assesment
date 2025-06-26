export interface Battery {
  'academyId':  string;
  'batteryLevel': number;
  'employeeId': string;
  'serialNumber': string;
  'timestamp': string;
}

export interface index {
  [key: string]: Battery[];
}

export interface index2 {
  [key: number]: Battery[];
}

export interface index3 {
  [key: string]: index;
}

