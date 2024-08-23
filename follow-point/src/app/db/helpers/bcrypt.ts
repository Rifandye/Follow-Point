import * as bcrypt from "bcryptjs";

const hashPass = (plainPass: string) => {
  return bcrypt.hashSync(plainPass, bcrypt.genSaltSync(8));
};

const comparePass = (plainPass: string, hashedPass: string) => {
  return bcrypt.compareSync(plainPass, hashedPass);
};

export { hashPass, comparePass };
