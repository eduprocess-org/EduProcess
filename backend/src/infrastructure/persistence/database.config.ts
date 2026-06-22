import pkg from '@prisma/client';
const { PrismaClient } = pkg as any;
import { PrismaPg } from '@prisma/adapter-pg';
import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';

declare global {
    var prisma: any | undefined;
}

const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

<<<<<<< HEAD
// Create Supabase client only if environment variables are provided.
// Export `null` when not configured to avoid runtime errors in local/dev without Supabase.
=======
>>>>>>> qa
export const supabase: any = (supabaseUrl && supabaseServiceKey)
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
    })
    : null;