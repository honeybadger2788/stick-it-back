module.exports = function (sequelize, dataTypes) {

    const Note = sequelize.define("Note",{
        id: {
            type: dataTypes.BIGINT(), primaryKey: true, autoIncrement: true, allowNull: false
        },
        title: {
            type: dataTypes.STRING(20), notNull: true,
        },
        text: {
            type: dataTypes.STRING(1000), notNull: true,
        },
    },
    {
        tableName: 'note',
        timestamps: true
    });
    return Note;
}