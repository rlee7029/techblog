var Sequelize = require('sequelize');
var bcrypt = require('bcrypt')

const sequelize = new Sequelize('tech_blog_db', 'root','root', {
host: 'localhost',
port: 3306,
dialect: 'mysql',
pool: {
    max: 5,
    min:0,
    acquire:30000,
    idle:10000
},
operatorsAliases: false
});


// create user table

var User = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    username:{
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
    },

    password:{
        type: Sequelize.STRING,
        allowNull:false
    }

});


User.beforeCreate((user, options) =>{
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.validPassword =function(password){
    return bcrypt.compareSync(password, this.password);
};


// create all tables in the specified database

sequelize.sync()
.then(()=> console.log('user tables has been successfully created if one doesnot exist'))
.catch(error => console.log('Error occured', error))


// export user modlue for other files
module.exports = User;
