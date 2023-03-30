import chalk from "chalk";

export const errorLog = (prop) => {
  console.log(chalk.redBright.inverse(prop));
};
export const infoLog = (prop) => {
  console.log(chalk.blueBright.inverse(prop));
};
export const statusLog = (prop) => {
  console.log(chalk.greenBright.inverse(prop));
};
