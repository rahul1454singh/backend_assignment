const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  employeeID: {
    type: String,
    required: true,
    unique: true
  },
  departments: {
    type: [String],
    default: []
  },
  salary: {
    type: Number,
    required: true,
    min: 10000,
    validate: {
      validator: function(v) {
        return v % 1000 === 0;
      },
      message: "Salary must be a multiple of 1,000"
    }
  },
  joiningDate: {
    type: Date,
    default: Date.now
  }
});


employeeSchema.pre("save", function(next) {
  this.name = this.name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  next();
});

module.exports = mongoose.model("Employee", employeeSchema);
