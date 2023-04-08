const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')
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
 * User schema 
 */
const userSchema = Schema({
    id: { type: Number, unique: true, required: true },
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
    first_name: { type: String, reuired: true, minLength: 3 },
    last_name: { type: String, reuired: true, minLength: 1 },
    password: { type: String, required: true },
    phone_number: { type: String, match: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/ },
    role: { type: String, required: true },
    created_date: { type: Date, immutable: true, default: () => { return Date.now() } },
    created_by: { type: String, immutable: true, default: 'SYSTEM' },
    modified_date: { type: Date },
    modified_by: { type: String }
});

/**
* hash password before insert
*/
/*userSchema.pre('save', (next) => {
    let user = this;
    //if (!user.isModified('password')) return next();
    try {
        console.log(user, this);
        const saltOrRounds = 10;
        user.password = bcrypt.hashSync(user.password, saltOrRounds);
        next();
    } catch (ex) {
        return next(ex);
    }

})*/
module.exports = model("eshop-user", userSchema, "USERS");