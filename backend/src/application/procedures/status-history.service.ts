import { logger } from '../../infrastructure/config/logger.config';

export interface TimelineEntry {
  status: string;
  date: string;
  description: string;
}

export class StatusHistoryService {
  buildTimeline(
    request: {
      createdAt: Date | string;
      status: string;
      observations?: Array<{ comment: string; createdAt: Date | string }>;
      auditLogs?: Array<{ action: string; oldValue: string | null; newValue: string | null; createdAt: Date | string }>;
    },
    statusLabels: Record<string, string>
  ): TimelineEntry[] {
    const timeline: TimelineEntry[] = [];

    timeline.push({
      status: 'Submitted',
      date: new Date(request.createdAt).toISOString().split('T')[0],
      description: 'Request submitted successfully.',
    });

    if (request.auditLogs?.length) {
      const sortedAuditLogs = [...request.auditLogs].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      for (const log of sortedAuditLogs) {
        if (log.action !== 'STATUS_CHANGE') continue;

        const newStatusLabel = statusLabels[log.newValue ?? ''] ?? log.newValue ?? 'Unknown';
        timeline.push({
          status: newStatusLabel,
          date: new Date(log.createdAt).toISOString().split('T')[0],
          description: `Status changed to ${newStatusLabel}.`,
        });
      }
    }

    if (request.observations?.length) {
      const sortedObs = [...request.observations].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      for (const obs of sortedObs) {
        const lastEntry = timeline[timeline.length - 1];
        if (lastEntry && lastEntry.date === new Date(obs.createdAt).toISOString().split('T')[0]) {
          lastEntry.description = obs.comment;
        } else {
          timeline.push({
            status: statusLabels[request.status] ?? request.status,
            date: new Date(obs.createdAt).toISOString().split('T')[0],
            description: obs.comment,
          });
        }
      }
    }

    return timeline;
  }

  logStatusChange(params: {
    requestId: string;
    fromStatus: string;
    toStatus: string;
    userId: string;
    adminName?: string;
  }): void {
    const adminInfo = params.adminName ? ` by ${params.adminName}` : '';
    logger.info(
      `Request ${params.requestId}: status changed from ${params.fromStatus} to ${params.toStatus}${adminInfo}`,
      {
        requestId: params.requestId,
        fromStatus: params.fromStatus,
        toStatus: params.toStatus,
        userId: params.userId,
        action: 'STATUS_CHANGE',
      }
    );

    if (params.toStatus === 'approved') {
      logger.info(`Request ${params.requestId}: approved${adminInfo}`, {
        requestId: params.requestId,
        action: 'APPROVED',
        userId: params.userId,
      });
    }

    if (params.toStatus === 'rejected') {
      logger.info(`Request ${params.requestId}: rejected${adminInfo}`, {
        requestId: params.requestId,
        action: 'REJECTED',
        userId: params.userId,
      });
    }
  }
}
