export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IPrice = {
  amountPerWeek: number;
  daysPerWeek: number;
};

export type IService = {
  _id: string;
  instructorId: string;
  subject: string;
  description: string;
  image?: string;
  price: IPrice[];
  level: "junior" | "secondary" | "higher-secondary";
  rating?: number;
  location: string;
  seats: number;
  enrolled?: number;
  isAvailable?: boolean;
  classtime: string;
};


 export type IBatch = {
  amountPerWeek: number;
  daysPerWeek: number;
};

 export type IBooking = {
   userId: string;
   serviceId: string;
   status?: boolean; // true = accepted, false = rejected
   batch: IBatch;
   startDate: string;
   endDate: string;
 };


 export type IServiceReview = {
   studentId: string;
   courseId: string;
   description: string;
   rating: number;
 };


 export type IUserProfile = {
   name: string;
   email: string;
   password: string;
   role?: "user" | "admin" | "super_admin";

   profileImgUrl?: string;
   phonenumber: string;
 };


