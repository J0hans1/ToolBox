
export function validatefirstName(firstName: string){
    const regEx = new RegExp('^[^0-9]*$'); // Minimum 1 character, no numbers
    return regEx.test(firstName);
}

export function validatelastName(lastName: string){
    const regEx = new RegExp('^[^0-9]*$'); // Minimum 1 character, no numbers
    return regEx.test(lastName);
}

export function validateUserName(userName: string){
    const regEx = new RegExp('^[A-Za-z][A-Za-z0-9]{4,15}$'); // Minimum 5 characters, maximum 16 characters, no special characters
    return regEx.test(userName);
}

export function validatePassword(password: string){
    const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // Minimum 6 characters, at least one uppercase letter, one lowercase letter and one number
    //const regEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0.9]).{4,}$');
    return regEx.test(password);
}

export function validatePhoneNumber(phoneNumber: string){
    const regEx = new RegExp('^[0-9]{8}$'); // Minimum 8 numbers
    return regEx.test(phoneNumber);
}

export function validateEmail(email: string){
    const regEx = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$'); // Minimum 1 character, @, minimum 1 character, ., minimum 2 characters
    return regEx.test(email);
}

export function validateAddress(address: string){
    const regEx = new RegExp('^[^0-9]+\\s\\d+$'); // Minimum 1 character, space, minimum 1 number
    //const regEx = new RegExp('^[^0-9]*$');
    return regEx.test(address);
}

export function validateZip(zip: string){
    const regEx = new RegExp('^[0-9]{4}$'); // Minimum 4 numbers
    return regEx.test(zip);
}

export function validateCity(city: string){
    const regEx = new RegExp('^[^0-9]*$'); // Minimum 1 character, no numbers
    return regEx.test(city);
}

export function validateSimilarPasswords(password: string, password2: string){
    if (password !== password2) return false;
    return true;
}

export function validateDescription(description: string){
    const regEx = new RegExp('^.{5,500}$'); // Minimum 5 characters, maximum 500 characters
    return regEx.test(description);
}

export function validatePrice(price: string){
    const regEx = new RegExp('^[0-9]{1,6}$'); // Minimum 1 number, maximum 6 numbers
    return regEx.test(price);
}

export function validateTitle(title: string){
    const regEx = new RegExp('^.{4,20}$'); // Minimum 4 characters, maximum 20 characters
    return regEx.test(title);
}