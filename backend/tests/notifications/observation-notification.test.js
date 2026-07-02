const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

const SERVICE_PATH = 'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\application\\observations\\observation.service.ts';
const ROUTES_PATH = 'C:\\Users\\User\\Documents\\EduProcess\\backend\\src\\infrastructure\\http\\routes\\observation.routes.ts';

describe('Observation Notification - Unit Tests', () => {
    it('should have NotificationService imported in ObservationService', () => {
        const content = fs.readFileSync(SERVICE_PATH, 'utf8');
        assert.ok(content.includes("import { NotificationService }"), 'Should import NotificationService');
    });

    it('should have notificationService as optional constructor param', () => {
        const content = fs.readFileSync(SERVICE_PATH, 'utf8');
        assert.ok(content.includes('private readonly notificationService?: NotificationService'), 'Should have notificationService property');
    });

    it('should create notification after observation is created', () => {
        const content = fs.readFileSync(SERVICE_PATH, 'utf8');
        assert.ok(content.includes('this.notificationService.createNotification'), 'Should call createNotification');
        assert.ok(content.includes("typeName: 'ADMIN_OBSERVATION'"), 'Should use ADMIN_OBSERVATION type');
    });

    it('should use studentId for notification recipient', () => {
        const content = fs.readFileSync(SERVICE_PATH, 'utf8');
        assert.ok(content.includes('userId: observation.studentId'), 'Should use observation.studentId as userId');
    });

    it('should include comment in notification message', () => {
        const content = fs.readFileSync(SERVICE_PATH, 'utf8');
        assert.ok(content.includes('observation.comment'), 'Should include comment in message');
    });

    it('should have NotificationService injected in routes', () => {
        const content = fs.readFileSync(ROUTES_PATH, 'utf8');
        assert.ok(content.includes('NotificationService'), 'Should import NotificationService');
        assert.ok(content.includes('PrismaNotificationRepository'), 'Should import PrismaNotificationRepository');
        assert.ok(content.includes('new NotificationService'), 'Should create NotificationService instance');
        assert.ok(content.includes('notificationService'), 'Should pass notificationService to ObservationService');
    });
});
