const Joi = require('@hapi/joi')
const Client = require('./../../../models/client')
const encrypt = require('./../../../utils/encrypt')

module.exports = async (req, res) => {
  let clientData = await schema.validateAsync(req.body)
  clientData.password = await encrypt(clientData.password)

  delete clientData.password_confirmation

  let client = new Client(clientData)
  await client.save()

  // Log new user
  const token = await client.generateAuthToken()

  return res.header('x-auth-token', token).status(201).json({message: "Client created"})
}

const schema = Joi.object({
  name: Joi.string().min(4).required(),
  last_name: Joi.string().min(4),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
  password_confirmation: Joi.any().valid(Joi.ref('password')).required(),
  phone: Joi.string().required()
})