export interface Address {
  locality: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface Location {
  type: string;
  coordinates: number[];
}

export interface Auth {
  expires: string;
  token: string;
}

export interface sanchalakModel {
  address: Address;
  location: Location;
  auth: Auth;
  aadharNumber: string;
  referralCode: string;
  gender: string;
  occupation: string;
  dob: string;
  age: string;
  motherTongue: string;
  maritalStatus: string;
  dependents: number;
  role: string;
  orders: any[];
  isVip: number;
  externalUrls: any[];
  status: number;
  _id: string;
  passHash: string;
  email: string;
  media: any[];
  cart: any[];
  salt: string;
  initialPas: string;
  createdAt: Date;
  updatedAt: Date;
  rollNumber: number;
  __v: number;
}


  export interface ExternalUrl {
      type: string;
      url: string;
  }

  export interface RootObject {
      location: Location;
      auth: Auth;
      userName: string;
      role: string;
      products: any[];
      orders: any[];
      wishlist: any[];
      wishlistServices: any[];
      cart: any[];
      cartServices: any[];
      services: any[];
      isVip: number;
      externalUrls: ExternalUrl[];
      status: number;
      _id: string;
      dob: string;
      email: string;
      name: string;
      number: string;
      media: any[];
      gallery: any[];
  }



