module.exports = (sequelize, DataTypes)=>{
    const Logs = sequelize.define("Logs", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        classGroup: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalStudents: {
            type: DataTypes.INTEGER
        },
        message: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATEONLY
        }
    })
    return Logs
}