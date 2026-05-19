// fix_database.js - Run this once to fix existing data
const pool = require('./db');

async function fixDatabase() {
  try {
    console.log('🔧 Starting database fix...');
    
    // Check current data
    const checkResult = await pool.query('SELECT id, title, images FROM gallery_posts');
    console.log(`Found ${checkResult.rows.length} gallery posts`);
    
    for (const row of checkResult.rows) {
      console.log(`Post ${row.id}: ${row.title}`);
      console.log(`  Current images value:`, row.images);
      console.log(`  Type: ${typeof row.images}`);
    }
    
    // Fix all rows
    await pool.query(`
      UPDATE gallery_posts 
      SET images = 
        CASE 
          WHEN images IS NULL THEN '[]'::jsonb
          WHEN jsonb_typeof(images) IS NULL THEN jsonb_build_array(images)
          WHEN jsonb_typeof(images) = 'string' THEN jsonb_build_array(images)
          ELSE images
        END
      WHERE jsonb_typeof(images) IS NULL 
         OR jsonb_typeof(images) = 'string'
         OR images IS NULL
    `);
    
    console.log('✅ Database fix completed!');
    
    // Verify fix
    const verifyResult = await pool.query('SELECT id, title, jsonb_typeof(images) as type, images FROM gallery_posts');
    console.log('\n📊 Fixed data:');
    for (const row of verifyResult.rows) {
      console.log(`Post ${row.id}: Type=${row.type}, Images=${JSON.stringify(row.images)}`);
    }
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

fixDatabase();