export type JobStatus = 'CREATED' | 'ASSIGNED' | 'COMPLETED';
export interface JobData {
    _id: string,
    title: string;
    clientName: string;
    phoneNumber: string;
    deliveryDate: string;
    pickupLocation: string;
    dropoffLocation: string;
    packageQuantity?: number;
    status: JobStatus;
    imageIds: string[];
    description: string;
    price?: number;
}

export interface JobOwnerView extends JobData{
    applicants: {userId: string, applyDate: string}[];
    assignedDriverId: string;
    startDate: string;
}

export interface ApplicantData {
    firstName: string;
    lastName: string;
    phone: string;
    vehicleInformation: string;
}