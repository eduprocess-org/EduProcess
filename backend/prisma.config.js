require('dotenv').config();

const rawUrl = process.env.DIRECT_URL || process.env.DATABASE_URL || '';
<<<<<<< HEAD
let datasourceUrl = rawUrl;

if (rawUrl && rawUrl.includes('supabase.co') && !rawUrl.includes('sslmode')) {
    datasourceUrl = rawUrl.includes('?') ? `${rawUrl}&sslmode=require` : `${rawUrl}?sslmode=require`;
=======

let datasourceUrl = rawUrl;

if (rawUrl && rawUrl.includes('supabase.co') && !rawUrl.includes('sslmode')) {
    datasourceUrl = rawUrl.includes('?')
        ? `${rawUrl}&sslmode=require`
        : `${rawUrl}?sslmode=require`;
>>>>>>> qa
}

module.exports = {
    datasource: {
<<<<<<< HEAD
        url: datasourceUrl
    }
=======
        url: datasourceUrl,
    },
    migrations: {
        seed: 'node prisma/seeds/admin.seed.js',
    },
>>>>>>> qa
};