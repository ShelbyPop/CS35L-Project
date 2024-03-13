import chalk from 'chalk';
import { MongoClient } from 'mongodb';

const uri = process.argv[process.argv.length - 1];

console.error(chalk.cyan("[INFO]") + `: Checking URI: "${uri}"`);

async function run() {
	let client;
	try {
		client = new MongoClient(uri);
		await client.connect();
		await client.db("admin").command({ ping: 1 });
		console.error(chalk.cyan("  [OK]") + ": MongoDB URI successfully pinged");
		process.exit(0);
	} catch (e) {
		console.error(chalk.magenta(" [ERR]") + ": MongoDB URI failed to connect");
		console.error("        Make sure your URI begins with \"mongodb+srv://\"");
		process.exit(1);
	}
}

run().catch(console.dir);
