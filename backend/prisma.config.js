require('dotenv').config();

const rawUrl = process.env.DIRECT_URL || process.env.DATABASE_URL || '';

let datasourceUrl = rawUrl;

if (rawUrl && rawUrl.includes('supabase.co') && !rawUrl.includes('sslmode')) {
    datasourceUrl = rawUrl.includes('?')
        ? `${rawUrl}&sslmode=require`
        : `${rawUrl}?sslmode=require`;
}

module.exports = {
    datasource: {
        url: datasourceUrl,
    },
    migrations: {
        seed: 'node prisma/seeds/admin.seed.js',
    },
};