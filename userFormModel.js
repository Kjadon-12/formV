const mongoose = require('mongoose');

//create schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
              return /^[a-zA-Z]+$/.test(value);
            },
            message: 'First name must contain only alphabets.'
          }

    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
              return /^[a-zA-Z]+$/.test(value);
            },
            message: 'Last name must contain only alphabets.'
          }

    },
    email: {
        type: String,
        required: true,
       // unique: true,
        validate: {
        validator: function (value) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: 'Invalid email format.'
    }
    },
    country: {
        type:String,
        required: [true, 'Country is required'],
    },
    state: {
        type:String,
        required: [true, 'State is required'],
    },
    city: {
        type:String,
        required: [true, 'City is required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['male', 'female']
    },
     dob: {
        type: Date
    },
    age: {
        type: Number,
    },
    

}, {
    toJSON: {
            virtuals: true,
    },
    toObject: {
        virtuals: true,

    },
    timestamps: true,
});



//compile schema into model

const User = mongoose.model('User', userSchema);

module.exports = User;