import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite serive :: createAccount :: error ", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite serive :: login :: error ", error);
    }
  }

  async getCurrentUser() {
    try {
      if (this.account.get) {
        return await this.account.get();
      } else {
        return null;
      }
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error ", error);
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: Logout :: error ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
