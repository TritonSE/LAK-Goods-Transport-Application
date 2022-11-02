export interface Job {
    clientName: string
    deliveryDate: string
    description?: string
    dropoffLocation: string
    imageIds?: []
    packageQuantity?: number
    phoneNumber: string
    pickupLocation: string
    price?: number
    status: string
    title: string
}