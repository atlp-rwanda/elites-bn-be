import Joi from "joi";

export const roleValidate = (req, res, next) => {
  const roleValidation = Joi.object({
    email: Joi.string().required().email(),
<<<<<<< HEAD
    
   
  });
  const result = roleValidation.validate(req.body,req.params.id);
 

  if (result.error) {
    return res.status(400).json({ message:result.error.details[0].message.replace(/["'`]+/g, "") });
  
  } 
=======
    role: Joi.string()
      .required()
      .valid("requester","accommodation-supplier", "manager", "travel-admin", "admin")
      .trim(),
  });
  const result = roleValidation.validate(req.body);
 

  if (result.error) {
    return res.status(400).json({ message:result.error.details[0].message });
  
  }
>>>>>>> c5bc603 (added update role)
  next();
};

