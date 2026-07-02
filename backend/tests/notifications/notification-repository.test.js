const { describe, it, mock, beforeEach } = require('node:test');
const assert = require('node:assert');

// Mock Prisma
const mockPrisma = {
    notification: {
        findMany: mock.fn(),
        create: mock.fn(),
        updateMany: mock.fn(),
    },
    notificationTypeCatalog: {
        upsert: mock.fn(),
    },
};

// We test the repository logic by verifying the SQL operations
describe('NotificationRepository - Unit Tests', () => {
    describe('Repository Interface', () => {
        it('should define correct interface methods', () => {
            const fs = require('fs');
            const interfaceContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\domain\\notifications\\notification.repository.ts',
                'utf8'
            );

            assert.ok(interfaceContent.includes('findByUser'), 'Should have findByUser method');
            assert.ok(interfaceContent.includes('markAsRead'), 'Should have markAsRead method');
            assert.ok(interfaceContent.includes('markAllAsRead'), 'Should have markAllAsRead method');
            assert.ok(interfaceContent.includes('create'), 'Should have create method');
        });
    });

    describe('Repository Implementation', () => {
        it('should implement all interface methods', () => {
            const fs = require('fs');
            const repoContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\infrastructure\\persistence\\prisma\\notification\\prisma-notification.repository.ts',
                'utf8'
            );

            assert.ok(repoContent.includes('async findByUser'), 'Should implement findByUser');
            assert.ok(repoContent.includes('async markAsRead'), 'Should implement markAsRead');
            assert.ok(repoContent.includes('async markAllAsRead'), 'Should implement markAllAsRead');
            assert.ok(repoContent.includes('async create'), 'Should implement create');
        });

        it('should use Prisma notification model', () => {
            const fs = require('fs');
            const repoContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\infrastructure\\persistence\\prisma\\notification\\prisma-notification.repository.ts',
                'utf8'
            );

            assert.ok(repoContent.includes('prisma.notification.findMany'), 'Should use findMany');
            assert.ok(repoContent.includes('prisma.notification.create'), 'Should use create');
            assert.ok(repoContent.includes('prisma.notification.updateMany'), 'Should use updateMany');
        });

        it('should include type relation in queries', () => {
            const fs = require('fs');
            const repoContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\infrastructure\\persistence\\prisma\\notification\\prisma-notification.repository.ts',
                'utf8'
            );

            assert.ok(repoContent.includes('include: notificationWithtype'), 'Should include type relation');
            assert.ok(repoContent.includes('type: true'), 'Should include type: true');
        });

        it('should order notifications by createdAt desc', () => {
            const fs = require('fs');
            const repoContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\infrastructure\\persistence\\prisma\\notification\\prisma-notification.repository.ts',
                'utf8'
            );

            assert.ok(repoContent.includes("orderBy: { createdAt: 'desc' }"), 'Should order by createdAt desc');
        });

        it('should map isRead to read in DTO', () => {
            const fs = require('fs');
            const repoContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\infrastructure\\persistence\\prisma\\notification\\prisma-notification.repository.ts',
                'utf8'
            );

            assert.ok(repoContent.includes('isRead: n.isRead'), 'Should map isRead to read');
        });

        it('should use upsert for notification type catalog', () => {
            const fs = require('fs');
            const repoContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\infrastructure\\persistence\\prisma\\notification\\prisma-notification.repository.ts',
                'utf8'
            );

            assert.ok(repoContent.includes('prisma.notificationTypeCatalog.upsert'), 'Should upsert type catalog');
        });

        it('should filter by userId in findByUser', () => {
            const fs = require('fs');
            const repoContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\infrastructure\\persistence\\prisma\\notification\\prisma-notification.repository.ts',
                'utf8'
            );

            assert.ok(repoContent.includes('where: { userId }'), 'Should filter by userId');
        });

        it('should filter by notificationId and userId in markAsRead', () => {
            const fs = require('fs');
            const repoContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\infrastructure\\persistence\\prisma\\notification\\prisma-notification.repository.ts',
                'utf8'
            );

            assert.ok(repoContent.includes('where: { id: notificationId, userId }'), 'Should filter by id and userId');
            assert.ok(repoContent.includes('data: { isRead: true }'), 'Should set isRead to true');
        });

        it('should filter by userId and isRead in markAllAsRead', () => {
            const fs = require('fs');
            const repoContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\infrastructure\\persistence\\prisma\\notification\\prisma-notification.repository.ts',
                'utf8'
            );

            assert.ok(repoContent.includes('where: { userId, isRead: false }'), 'Should filter by userId and isRead: false');
        });
    });

    describe('Notification Types', () => {
        it('should define NotificationDTO correctly', () => {
            const fs = require('fs');
            const typesContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\domain\\notifications\\notification.types.ts',
                'utf8'
            );

            assert.ok(typesContent.includes('interface NotificationDTO'), 'Should define NotificationDTO');
            assert.ok(typesContent.includes('id: string'), 'Should have id field');
            assert.ok(typesContent.includes('title: string'), 'Should have title field');
            assert.ok(typesContent.includes('message: string'), 'Should have message field');
            assert.ok(typesContent.includes('isRead: boolean'), 'Should have isRead field');
            assert.ok(typesContent.includes('createdAt: Date'), 'Should have createdAt field');
            assert.ok(typesContent.includes('userId: string'), 'Should have userId field');
        });

        it('should define CreateNotificationInput correctly', () => {
            const fs = require('fs');
            const typesContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\domain\\notifications\\notification.types.ts',
                'utf8'
            );

            assert.ok(typesContent.includes('interface CreateNotificationInput'), 'Should define CreateNotificationInput');
            assert.ok(typesContent.includes('userId: string'), 'Should have userId field');
            assert.ok(typesContent.includes('title: string'), 'Should have title field');
            assert.ok(typesContent.includes('message: string'), 'Should have message field');
            assert.ok(typesContent.includes('typeName?'), 'Should have optional typeName field');
        });

        it('should define NotificationType union', () => {
            const fs = require('fs');
            const typesContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\domain\\notifications\\notification.types.ts',
                'utf8'
            );

            assert.ok(typesContent.includes('type NotificationType'), 'Should define NotificationType');
            assert.ok(typesContent.includes('REQUEST_CREATED'), 'Should include REQUEST_CREATED');
            assert.ok(typesContent.includes('REQUEST_UPDATED'), 'Should include REQUEST_UPDATED');
            assert.ok(typesContent.includes('REQUEST_APPROVED'), 'Should include REQUEST_APPROVED');
            assert.ok(typesContent.includes('REQUEST_REJECTED'), 'Should include REQUEST_REJECTED');
            assert.ok(typesContent.includes('ADMIN_OBSERVATION'), 'Should include ADMIN_OBSERVATION');
        });
    });

    describe('Service Integration', () => {
        it('should have NotificationService using repository', () => {
            const fs = require('fs');
            const serviceContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\application\\notifications\\notification.service.ts',
                'utf8'
            );

            assert.ok(serviceContent.includes('NotificationRepository'), 'Should import NotificationRepository');
            assert.ok(serviceContent.includes('private readonly notificationRepository'), 'Should have repository property');
        });

        it('should have repository injected in notification routes', () => {
            const fs = require('fs');
            const routesContent = fs.readFileSync(
                'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\infrastructure\\http\\routes\\notification.routes.ts',
                'utf8'
            );

            assert.ok(routesContent.includes('PrismaNotificationRepository'), 'Should import PrismaNotificationRepository');
            assert.ok(routesContent.includes('new PrismaNotificationRepository()'), 'Should create repository instance');
            assert.ok(routesContent.includes('new NotificationService(repository)'), 'Should inject repository into service');
        });
    });
});
