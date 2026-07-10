import type { Meta, StoryObj } from "@storybook/react";
import AdminSidebar from "../../components/navigation/admin/AdminSidebar";


const meta: Meta<typeof AdminSidebar> = {
  title: "Layout/AdminSidebar",
  component: AdminSidebar,
  tags: ["autodocs"],

  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],

  argTypes:{
    isCollapsed:{
      control:"boolean"
    }
  }
};


export default meta;


type Story = StoryObj<typeof AdminSidebar>;


export const Expanded: Story = {
  args:{
    isCollapsed:false
  }
};


export const Collapsed: Story = {
  args:{
    isCollapsed:true
  }
};