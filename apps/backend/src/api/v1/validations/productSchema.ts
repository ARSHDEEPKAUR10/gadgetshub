import Joi from "joi";

export const productSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().trim().required(),
  brand: Joi.string().trim().required(),
  category: Joi.string()
    .valid("Smartphone", "Laptop", "Headphones", "Accessories")
    .required(),
  price: Joi.number().positive().required(),
  image: Joi.string().required(),
  colors: Joi.array().items(Joi.string()).required(),
  taglineLines: Joi.array().items(Joi.string()).required(),

  display: Joi.string().allow("", null),
  chip: Joi.string().allow("", null),
  ram: Joi.string().allow("", null),
  storage: Joi.string().allow("", null),
  battery: Joi.string().allow("", null),
  camera: Joi.string().allow("", null),
  os: Joi.string().allow("", null),
  connectivity: Joi.string().allow("", null),
});