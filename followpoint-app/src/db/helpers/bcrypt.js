import bcryptjs from "bcryptjs";

export const hashPass = (pass) => bcryptjs.hashSync(pass);
export const comparePass = (pass, hash) => bcryptjs.compareSync(pass, hash);
