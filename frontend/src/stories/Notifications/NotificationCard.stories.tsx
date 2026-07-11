import type { Meta, StoryObj } from "@storybook/react";

import NotificationCard from "../../components/notification/NotificationCard";

import type { Notification } from "../../types/notification/notification";


const meta: Meta<typeof NotificationCard> = {
  title: "Notifications/NotificationCard",

  component: NotificationCard,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
};


export default meta;


type Story = StoryObj<typeof NotificationCard>;


// Mock base tipado correctamente
const baseNotification: Notification = {
  id: "notification-001",

  title: "Solicitud aprobada",

  message:
    "Tu solicitud de trámite fue aprobada correctamente.",

  type: "REQUEST_APPROVED",

  createdAt: "2026-07-10T15:30:00",

  read: false,

  userId: "user-001",

  role: "STUDENT",
};



// Solicitud aprobada
export const Approved: Story = {
  args: {
    notification: baseNotification,
  },
};



// Solicitud rechazada
export const Rejected: Story = {
  args: {
    notification: {
      ...baseNotification,

      id: "notification-002",

      title: "Solicitud rechazada",

      message:
        "Tu solicitud necesita correcciones antes de continuar.",

      type: "REQUEST_REJECTED",
    },
  },
};



// Observación administrativa
export const AdministrativeObservation: Story = {
  args: {
    notification: {
      ...baseNotification,

      id: "notification-003",

      title: "Nueva observación administrativa",

      message:
        "El administrador agregó una observación a tu solicitud.",

      type: "ADMIN_OBSERVATION",
    },
  },
};



// Solicitud creada
export const Created: Story = {
  args: {
    notification: {
      ...baseNotification,

      id: "notification-004",

      title: "Solicitud creada",

      message:
        "Tu solicitud fue registrada correctamente.",

      type: "REQUEST_CREATED",
    },
  },
};



// Notificación no leída
export const Unread: Story = {
  args: {
    notification: {
      ...baseNotification,

      read: false,
    },
  },
};



// Notificación leída
export const Read: Story = {
  args: {
    notification: {
      ...baseNotification,

      read: true,
    },
  },
};