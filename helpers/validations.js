class Validator{
    validateEmail(email){
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return email.match(emailPattern)
    }
    validatePassword(password){
        //Minimum 6 characters
        // Maximum 12 characters
        // At least one uppercase character 
        // At least one lowercase character
        // At least one digit
        // At least one special character
        const passwordPattern=/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
        return password.match(passwordPattern)     
    }
    validatePhone(phone){
        if(phone.lenght<10) return false
        return /^\d+\.\d+$/.test(phone)
    }
}
module.exports=Validator