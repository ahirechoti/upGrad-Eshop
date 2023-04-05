import { Schema, model } from 'mongoose';
import { bcrypt } from 'bcrypt';
/**
 * 
 * @param {String} email 
 * @returns boolean
 */
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

/**
 * Compare password to verify if it is valid.
 */
userSchema.methods.comparePassword = (password, cb) => {
    try {
        const isMatch = bcrypt.compareSync(password, this.password);
        //callback with validate validateHeaderValue;
        cb(isMatch);
    } catch (ex) {
        return cb(ex);
    }


}
/**
 * User schema 
 */
const userSchema = Schema({
    id: { type: Number, unique: true, min: 1, required: true },
    user_name: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    firt_name: { type: String, reuired: true, minLength: 3 },
    last_name: { type: String, reuired: true, minLength: 1 },
    password: { type: String, required: true },
    phone_number: { type: String, match: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/ },
    role: { type: String, required: true },
    created_date: { type: Date, immutable: true, default: () => { return Date.now() } },
    created_by: { type: String, immutable: true },
    modified_date: { type: Date },
    modified_by: { type: String }
},
    {
        collection: "ECOMMERCE"
    });
/**
* hash password before insert
*/
userSchema.pre('save', (next) => {
    let user = this;
    //if (!user.isModified('password')) return next();
    try {
        const saltOrRounds = 10;
        user.password = bcrypt.hashSync(this.password, saltOrRounds);
        next();
    } catch (ex) {
        return next(ex);
    }

})
export default model("eshop-user", userSchema);