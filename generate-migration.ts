import { execSync } from 'child_process';

const migrationName = process.argv[2]; // Get the migration name from the command line argument
if (!migrationName) {
  console.error('Migration name is required');
  process.exit(1);
}

const command = `yarn typeorm migration:generate ./src/migrations/${migrationName} -d dist/ormconfig.js`;
console.log(`Running command: ${command}`);

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error generating migration:', error);
  process.exit(1);
}
