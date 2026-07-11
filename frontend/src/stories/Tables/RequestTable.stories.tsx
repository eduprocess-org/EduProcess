import type { Meta, StoryObj } from "@storybook/react";

import RequestTable from "../../components/admin-requests/RequestTable";

import type {
  AdminRequestListItem,
} from "../../types/admin/adminRequest.types";


const meta: Meta<typeof RequestTable> = {
  title: "Tables/RequestTable",
  component: RequestTable,
  tags: ["autodocs"],

  parameters: {
    layout: "fullscreen",
  },
};


export default meta;


type Story = StoryObj<typeof RequestTable>;



const requests: AdminRequestListItem[] = [
  {
    id: "REQ-001",
    studentName: "Juan Perez",
    studentEmail: "juan.perez@gmail.com",
    procedureName: "Academic Certificate",
    career: "Ingeniería en Informática",
    semester: "7",
    status: "pending",
    createdAt: "2026-07-10T10:30:00",
    updatedAt: "2026-07-10T10:30:00",
  },

  {
    id: "REQ-002",
    studentName: "Maria Lopez",
    studentEmail: "maria.lopez@gmail.com",
    procedureName: "Enrollment Certificate",
    career: "Sistemas de Información",
    semester: "5",
    status: "in_review",
    createdAt: "2026-07-09T09:15:00",
    updatedAt: "2026-07-09T12:20:00",
  },

  {
    id: "REQ-003",
    studentName: "Carlos Ramirez",
    studentEmail: "carlos.ramirez@gmail.com",
    procedureName: "Graduation Request",
    career: "Ingeniería en Informática",
    semester: "10",
    status: "approved",
    createdAt: "2026-07-08T08:00:00",
    updatedAt: "2026-07-09T15:00:00",
  },

  {
    id: "REQ-004",
    studentName: "Ana Torres",
    studentEmail: "ana.torres@gmail.com",
    procedureName: "Document Validation",
    career: "Diseño Industrial",
    semester: "7",
    status: "rejected",
    createdAt: "2026-07-07T14:30:00",
    updatedAt: "2026-07-08T11:10:00",
  },
  
];



export const Default: Story = {

  args: {

    requests,

    sortBy: "createdAt",

    order: "desc",

    onSort: () => {
      console.log("Sort clicked");
    },

    selectedRequests: [],

    onToggleSelect: (id) => {
      console.log("Selected:", id);
    },

    onToggleSelectAll: () => {
      console.log("Select all");
    },

    onViewRequest: (id) => {
      console.log("View request:", id);
    },

  },

};