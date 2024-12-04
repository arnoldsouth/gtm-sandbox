interface GTMEvent {
  event: string;
  eventCategory: string;
  eventAction: string;
  eventLabel: string;
  [key: string]: any;
}

interface VehicleEvent extends GTMEvent {
  vehicleId: string;
  vehicleName: string;
  vehiclePrice?: number;
  vehicleType?: string;
  listName?: string;
  listPosition?: number;
}

interface LeadEvent extends GTMEvent {
  leadType: string;
  preferredContact?: string;
}

interface Window {
  dataLayer: (GTMEvent | VehicleEvent | LeadEvent)[];
}

declare global {
  interface Window {
    dataLayer: (GTMEvent | VehicleEvent | LeadEvent)[];
  }
}

export {};
