export class User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    avatar:string;
    competance:string;
    role_id:number;
}

/*

export class User {
  id: number;
  username: string;
  password: string;  
  profile: UserProfile;
  work: UserWork;
  contacts: UserContacts;
  social: UserSocial;
  settings: UserSettings;
} */

export class UserProfile {
    name: string;
    surname: string;
    birthday: Object;
    gender: string;
    image: string;
}

export class UserWork {
    company: string;
    position: string;
    salary: number;
}

export class UserContacts {
    email: string;
    phone: string;
    address: string;
}

export class UserSocial {
    facebook: string;
    twitter: string;
    google: string;
}

export class UserSettings {
    isActive: boolean;
    isDeleted: boolean;
    registrationDate: Date;
    joinedDate: Date;
}
