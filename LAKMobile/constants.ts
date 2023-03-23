import { JobData, ApplicantData } from './src/api/data';

export const COLORS = {
  white: '#ffffff',
  maroon: '#94100C',
  turquoise: '#3A9A89',
  mediumGrey: '#8B8B8B',
  red: '#DA5C5C',
  gray: '#BABABA',
  deepGreen: '#0F920D',
  darkGrey: '#333333',
};

// TODO Remove (only for development phase)
export const MOCK_JOB_DATA: JobData = {
  title: 'Box of apples',
  clientName: 'Client Name',
  deliveryDate: 'MM/DD/YYYY',
  pickupLocation: 'District, Pick-up ',
  dropoffLocation: 'District, Drop-off ',
  applicants: 2,
  status: 'CREATED',
};

export const MOCK_APPLICANT_DATA: ApplicantData = {
  firstName: 'Gibby',
  lastName: 'Gibson',
  phone: 'Phone number',
  vehicleInformation: 'Vehicle Information',
};
