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
    //id: { type: Number, unique: true, required: true },
    //user_name: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,6}$/, 'Invalid email-id format!']
    },
    first_name: { type: String, reuired: true, minLength: 3 },
    last_name: { type: String, reuired: true, minLength: 1 },
    password: { type: String, required: true },
    contactNumber: { type: String, match: [/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, 'Invalid contact number!'] },
    role: { type: String, required: true, default: 'USER' },
    created_date: { type: Date, immutable: true, default: () => { return Date.now() } },
    created_by: { type: String, immutable: true, default: 'SYSTEM' },
    modified_date: { type: Date },
    modified_by: { type: String }
});
userSchema.path('email').validate(async function(value, done) {
    /*this.model('eshop-user').count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        } 
        // If `count` is greater than zero, "invalidate"
        done(!count);
    });*/
    const user = await this.model('eshop-user').findOne({email:value});
    return !user;
}, 'Try any other email, this email is already registered!');
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