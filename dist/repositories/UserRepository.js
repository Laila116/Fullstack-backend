"use strict";
// man kann  die Repo auch direckt in Controller machen muss nicht extra da sein!!
//----> siehe Controller ein Repo wurde schon erstellt
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
exports.UserRepository = void 0;
const dataSource_1 = require("../config/dataSource");
const User_1 = require("../entities/User");
class UserRepository {
    constructor() {
        this.repository = dataSource_1.AppDataSource.getRepository(User_1.User);
    }
    // 1. Benutzer mit ID finden
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({ where: { id } });
        });
    }
    // 2. Benutzer mit E-Mail finden
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({ where: { email } });
        });
    }
    // 3. Benutzer speichern oder aktualisieren
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(user);
        });
    }
    // 4. Alle Benutzer abrufen
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    // 5. Benutzer löschen
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
    /*async delete(user: User): Promise<void> {
      await this.repository.remove(user);
    }*/
    // 6. Benutzer mit benutzerdefinierter Abfrage finden
    findByName(firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({
                where: { firstName, lastName },
            });
        });
    }
}
exports.UserRepository = UserRepository;
