import type { Meta, StoryObj } from "@storybook/react";

import RequestStatusBadge from "../../../components/admin-requests/RequestStatusBadge";


const meta: Meta<typeof RequestStatusBadge> = {
  title: "UI/Badge/RequestStatusBadge",

  component: RequestStatusBadge,

  tags:[
    "autodocs"
  ],

  parameters:{
    layout:"centered"
  },

  argTypes:{
    status:{
      control:"select",

      options:[
        "PENDING",
        "IN_REVIEW",
        "APPROVED",
        "REJECTED",
      ],
    },
  },
};


export default meta;


type Story = StoryObj<typeof RequestStatusBadge>;



export const Pending: Story = {
  args:{
    status:"pending",
  },
};



export const InReview: Story = {
  args:{
    status:"in_review",
  },
};



export const Approved: Story = {
  args:{
    status:"approved",
  },
};



export const Rejected: Story = {
  args:{
    status:"rejected",
  },
};