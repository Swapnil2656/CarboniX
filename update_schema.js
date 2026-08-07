const fs = require('fs');

const webSchemaPath = '/Users/swapnilsen/CarboniX/apps/web/prisma/schema.prisma';
const apiSchemaPath = '/Users/swapnilsen/CarboniX/services/api/prisma/schema.prisma';

const webSchema = fs.readFileSync(webSchemaPath, 'utf8');
const apiSchema = fs.readFileSync(apiSchemaPath, 'utf8');

// Extract generator from web
const webGeneratorMatch = webSchema.match(/generator client\s*\{[\s\S]*?\}/);
const webGenerator = webGeneratorMatch ? webGeneratorMatch[0] : '';

// Replace generator in api
const updatedSchema = apiSchema.replace(/generator client\s*\{[\s\S]*?\}/, webGenerator);

fs.writeFileSync(webSchemaPath, updatedSchema);
console.log('Schema updated successfully');
