"use strict";
//Serviece wird nicht gebraucht --> muss alles in controller reingemacht!!
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = require("../repositories/UserRepository");
const User_1 = require("../entities/User");
class UserService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    /*
    // Benutzer nach ID abrufen
    async getUserById(id: number): Promise<User | null> {
      return await this.userRepository.findById(id);
    }
  */
    // Benutzer erstellen
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User();
            user.firstName = userData.firstName;
            user.lastName = userData.lastName;
            user.email = userData.email;
            user.password = yield bcrypt_1.default.hash(userData.password, 10); // Passwort verschlüsseln
            return yield this.userRepository.save(user);
        });
    }
}
exports.UserService = UserService;
/*
  // Alle Benutzer abrufen
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  // Benutzer löschen
  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await this.userRepository.deleteById(id);
  }

  // Benutzer aktualisieren
  async updateUser(id: number, updateData: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Felder aktualisieren, wenn sie bereitgestellt werden
    user.firstName = updateData.firstName ?? user.firstName;
    user.lastName = updateData.lastName ?? user.lastName;
    user.email = updateData.email ?? user.email;

    return await this.userRepository.save(user);
  }
}*/
