import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../../components/common/atoms/Button";

const meta: Meta<typeof Button> = {
  title: "UI/Atoms/Button",
  component: Button,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
      ],
    },

    size: {
      control: "select",
      options: [
        "sm",
        "md",
      ],
    },

    isLoading: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },
  },
};


export default meta;


type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Guardar",
    variant: "primary",
    size: "md",
  },
};


export const Secondary: Story = {
  args: {
    children: "Cancelar",
    variant: "secondary",
  },
};


export const Outline: Story = {
  args: {
    children: "Ver detalles",
    variant: "outline",
  },
};


export const Ghost: Story = {
  args: {
    children: "Editar",
    variant: "ghost",
  },
};


export const Small: Story = {
  args: {
    children: "Eliminar",
    size: "sm",
    variant: "primary",
  },
};


export const Loading: Story = {
  args: {
    children: "Guardando...",
    isLoading: true,
  },
};


export const Disabled: Story = {
  args: {
    children: "No disponible",
    disabled: true,
  },
};