module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define("Students", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: DataTypes.INTEGER
        },
        lastReminder: {
            type: DataTypes.DATEONLY
        },
        studentClass: {
            type: DataTypes.STRING
        },
        parentContact: {
            type: DataTypes.INTEGER
        }
    })

    return Students
}