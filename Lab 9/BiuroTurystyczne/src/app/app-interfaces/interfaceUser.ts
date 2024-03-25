export interface Role {
    gosc: boolean;
    klient: boolean;
    manager: boolean;
    admin: boolean;
    banned: boolean;
  }
  
  export class User {
    // username: string;
    email: string;
    password: string;
    role: Role;
  
    constructor(userData: any) {
      this.email = userData.email;
      // this.username = userData.username;
      this.password = userData.uid;
      if (userData.role != null) {
        this.role = userData.role;
      } else
        this.role = {
          klient: true,
          gosc: true,
          manager: false,
          admin: false,
          banned: false,
        };
    }
  }