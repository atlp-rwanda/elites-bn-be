module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            names: {
                type: Sequelize.STRING,
                null: false,
            },
            email: {
                type: Sequelize.STRING,
                null: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                null: false,
            },
            roleId: {
                type: Sequelize.INTEGER,
                null: false,
                default: 5,
                references: {
                    model: 'Roles',
                    key: 'id',
                    as: 'roleId',
                },
            },
            managerId: {
                type: Sequelize.INTEGER,
                default: null,
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'managerId',
                },
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                default: true,
            },
            verified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Users');
    },
};