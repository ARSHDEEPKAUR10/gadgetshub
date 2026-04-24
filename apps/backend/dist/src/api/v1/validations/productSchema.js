"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.productSchema = joi_1.default.object({
    id: joi_1.default.number().required(),
    name: joi_1.default.string().trim().required(),
    brand: joi_1.default.string().trim().required(),
    category: joi_1.default.string()
        .valid("Smartphone", "Laptop", "Headphones", "Accessories")
        .required(),
    price: joi_1.default.number().positive().required(),
    image: joi_1.default.string().required(),
    colors: joi_1.default.array().items(joi_1.default.string()).required(),
    taglineLines: joi_1.default.array().items(joi_1.default.string()).required(),
    display: joi_1.default.string().allow("", null),
    chip: joi_1.default.string().allow("", null),
    ram: joi_1.default.string().allow("", null),
    storage: joi_1.default.string().allow("", null),
    battery: joi_1.default.string().allow("", null),
    camera: joi_1.default.string().allow("", null),
    os: joi_1.default.string().allow("", null),
    connectivity: joi_1.default.string().allow("", null),
});
