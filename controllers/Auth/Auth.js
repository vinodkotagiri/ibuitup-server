const Validator =require('../../helpers/validations')
class Auth{
    constructor(){
        this.firstName=''
        this.lastName=''
        this.email=''
        this.phone=''
        this.password=''
        this.ip=''
        this.validator=new Validator()
    }
    main(req,res){
        const {firstName,lastName,email,phone,password}=req.body

        if(!(firstName && lastName && phone &&email && password))
        return res.status(400).json({error:'All fields are required!'})

        this.firstName=firstName
        this.lastName=lastName
        this.email=email
        this.phone=phone
        this.password=password

    }
}