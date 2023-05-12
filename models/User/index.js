const mongoose=require('mongoose')
const {AutoIncrement}=require('../')
const {Schema,model}=mongoose
const bcrypt=require('bcrypt')
const SALT_WORK_FACTOR = 12

const UserSchema=new Schema({
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    email:{type:String,require:true},
    phone:{type:Number,require:true},
    password:{type:String,require:true},
    accountType:{type:String,enum:['basic','standard','premium'],default:'basic'},
    verification:{
        email:{type:Boolean,default:false},
        phone:{type:Boolean,default:false},
        code:{type:String}
    },
    registrationIP:{type:String},
    lastLogin:{type:Date}
},{ _id: false }, { autoIndex: false, timestamps:true })
UserSchema.plugin(AutoIncrement,{inc_field:'id'})

//hash passwords before saving to db
UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password =bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
  //method to validate password
  UserSchema.methods.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  //create new user
  UserSchema.statics.createUser=async function(user){
    const createdUser=await this.create(user)
    return createdUser
  }

  //get user details
  UserSchema.statics.getUserDetails=async function(userID){
    return await this.find({id:userID})
  }

  //get user email
  UserSchema.statics.getUserEmail=async function(userID){
    return await this.findOne({id:userID},{email:1})
  }

  //get user account Type
  UserSchema.statics.getUserAccountType=async function(userID){
    return await this.findOne({id:userID},{accountType:1})
  }

  //check if user email exists
  UserSchema.statics.checkIfEmailAlreadyExists=async function(email){
    return await this.find({email})
  }
  //check if phone already exists
  UserSchema.statics.checkIfPhoneAlreadyExists=async function(phone){
    return await this.find({phone})
  }
  // set lastlogin
  UserSchema.statics.setLastLogin=async function(){
    this.lastLogin=Date.now()
  }

model.exports=model('User',UserSchema)

