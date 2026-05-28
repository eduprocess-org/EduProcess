import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});