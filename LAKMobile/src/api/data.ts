export type JobStatus = 'CREATED' | 'ASSIGNED' | 'COMPLETED';
export interface JobData {
    _id: string,
    title: string;
    clientName: string;
    phoneNumber: string;
    receiverName: string;
    receiverPhoneNumber: string;
    deliveryDate: string;
    pickupLocation: string;
    pickupDistrict: string;
    dropoffLocation: string;
    dropoffDistrict: string;
    description?: string;
    packageQuantity?: number;
    status: JobStatus;
    imageIds: string[];
    price?: number;
}

export interface JobOwnerView extends JobData {
    applicants: {userId: string, applyDate: string}[];
    assignedDriverId: string;
    startDate: string;
}

export interface VehicleData {
    vehicleType: string;
    vehicleModel: string;
    vehicleMake: string;
    vehicleColor: string;
    imageIds: string[];
}

export interface UserData {
    phone: string;
    firstName: string;
    lastName: string;
    location: string;
    driverLicenseId?: string; // Hidden when anyone else other than the user viewing
    vehicleData: VehicleData;
}
