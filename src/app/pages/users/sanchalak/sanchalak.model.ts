declare module namespace {

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
      fName: string;
      lName: string;
      imageUrl: string;
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
      phone: string;
      email: string;
      media: any[];
      cart: any[];
      createdAt: Date;
      updatedAt: Date;
      rollNumber: number;
      __v: number;
  }

}

