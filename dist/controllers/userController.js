"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const dataSource_1 = require("../config/dataSource");
const User_1 = require("../entities/User");
class UserController {
    constructor() {
        this.userRepository = dataSource_1.AppDataSource.getRepository(User_1.User);
        this.userService = new userService_1.UserService();
    }
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { email: email } });
        });
    }
    // Benutzer erstellen
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, password } = req.body;
                if (!firstName || !lastName || !email || !password) {
                    return res.status(400).json({
                        message: "angefordate Daten ist firstName, lastName, email, password",
                    });
                }
                const userData = yield this.getUser(email);
                if (userData) {
                    return res
                        .status(400)
                        .json({ message: "diese email ist schon verwandet" });
                }
                // const user = await this.userService.createUser({
                //   firstName,
                //   lastName,
                //   email,
                //   password,
                // });
                const user = yield this.userRepository.create({
                    firstName,
                    lastName,
                    email,
                    password,
                });
                this.userRepository.save(user);
                return res
                    .status(201)
                    .json({ message: "User created successfully", user });
            }
            catch (error) {
                console.error("Error in createUser:", error);
                return res.status(400).json({ message: "Error creating user" });
            }
        });
    }
    /*
    // Benutzer nach ID abrufen
    async getUserById(req: Request, res: Response): Promise<Response> { // spätter
      const { id } = req.params;
  
      try {
        const user = await this.userService.getUserById(parseInt(id));
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
      } catch (error) {
        console.error("Error in getUserById:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  
    // Alle Benutzer abrufen
    async getAllUsers(req: Request, res: Response): Promise<Response> {
      try {
        const users = await this.userService.getAllUsers();
        return res.json(users);
      } catch (error) {
        console.error("Error in getAllUsers:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  
    // Benutzer löschen
  
  
    // Benutzer aktualisieren
    async updateUser(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;
      const { firstName, lastName, email } = req.body;
  
      try {
        const updatedUser = await this.userService.updateUser(parseInt(id), {
          firstName,
          lastName,
          email,
        });
  
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
  
        return res.json({ message: "User updated successfully", updatedUser });
      } catch (error) {
        console.error("Error in updateUser:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  */
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                if (!email) {
                    return res.status(400).json({
                        message: "ID not Found",
                    });
                }
                yield this.userRepository
                    .createQueryBuilder()
                    .delete()
                    .from(User_1.User)
                    .where("email = :email", { email })
                    .execute();
                return res.json({ message: "User deleted successfully" });
            }
            catch (error) {
                console.error("Error in deleteUser:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.UserController = UserController;
