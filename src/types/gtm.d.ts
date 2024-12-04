export interface GTMEvent {
  event: string;
  eventCategory: string;
  eventAction: string;
  eventLabel: string;
  [key: string]: any;
}

export interface VehicleEvent extends GTMEvent {
  vehicleId: string;
  vehicleName: string;
  vehiclePrice?: number;
  vehicleType?: string;
  listName?: string;
  listPosition?: number;
}

export interface LeadEvent extends GTMEvent {
  leadType: string;
  preferredContact?: string;
}

declare global {
  interface Window {
    dataLayer: (GTMEvent | VehicleEvent | LeadEvent)[];
  }
}

export {};
