import Joi from 'joi';

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  code: Joi.string().required(),
  releasedAt: Joi.string().required(),
});
