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
const userController_1 = require("../controllers/userController");
const express_1 = require("express");
const router = (0, express_1.Router)(); // Router erzeugen
const userController = new userController_1.UserController();
router.route("/").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.createUser(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.route("/:email").delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.deleteUser(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error delete" });
    }
}));
/*
router.get('/', UserController.getAllUsers);  //später
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
*/
exports.default = router;
