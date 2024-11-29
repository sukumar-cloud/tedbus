export interface Bus {
    _id?: string; // Optional if you are using MongoDB's default _id field
    operatorName: string;
    busType: string;
    departureTime: string;
    rating: number[];
    totalSeats?: number;
    routes: string; // Assuming routes are stored as ObjectId references
    images: string;
    liveTracking: number;
    reschedulable: number;
  }