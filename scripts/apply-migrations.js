const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function main() {
  const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('No DATABASE_URL or SUPABASE_DATABASE_URL found. Skipping migrations.');
    process.exit(2);
  }

  const sql = fs.readFileSync(path.join(__dirname, '..', 'supabase', 'migrations', '001_init.sql'), 'utf8');
  const client = new Client({ connectionString: databaseUrl });
  try {
    await client.connect();
    console.log('Applying migration...');
    await client.query(sql);
    console.log('Migration applied');
    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    try { await client.end(); } catch (_) {}
    process.exit(3);
  }
}

if (require.main === module) main();
