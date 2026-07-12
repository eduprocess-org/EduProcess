import type { Meta, StoryObj } from "@storybook/react";

import NotificationBadge from "../../components/notification/NotificationBadge";


const meta: Meta<typeof NotificationBadge> = {
  title: "Notifications/NotificationBadge",

  component: NotificationBadge,

  tags: [
    "autodocs",
  ],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    read: {
      control: "boolean",
    },
  },
};


export default meta;


type Story = StoryObj<typeof NotificationBadge>;



export const Unread: Story = {
  args: {
    read: false,
  },
};



export const Read: Story = {
  args: {
    read: true,
  },
};