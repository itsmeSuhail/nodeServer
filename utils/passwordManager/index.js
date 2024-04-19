import becrypt from "bcrypt";
export const encrypt = async(key) => {
    return await becrypt.hash(key, 9);
}
export const decrypt = async(pass, userpass) => {
    const data =await becrypt.compare(userpass, pass);
    return data;
}