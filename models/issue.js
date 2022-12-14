const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Issue extends Model {
  setNameField(projectTitle, issueCount) {
    const words = projectTitle.split(' ')
    const projectAbbr = words
      .map((word) => word[0])
      .join('')
      .toUpperCase()

    this.setDataValue('name', `${projectAbbr}-${issueCount}`)
  }
}
Issue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    identifier: {
      type: DataTypes.VIRTUAL,
      get() {
        return `Issue ${this.name}`
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['backlog', 'todo', 'inProgress', 'done']],
      },
      defaultValue: 'todo',
    },
    attachmentUri: {
      type: DataTypes.STRING,
      isUrl: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['userStory', 'bug', 'task']],
      },
      defaultValue: 'userStory',
    },
    boardOrder: {
      type: DataTypes.INTEGER,
    },
    storyPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    assigneeId: {
      type: DataTypes.STRING,
      references: { model: 'users', key: 'id' },
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    sprintId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sprints',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'issue',
  }
)

module.exports = Issue
