import type { Meta, StoryObj } from "@storybook/react";

import TextInput from "../../components/forms/fields/TextInput";


const meta: Meta<typeof TextInput> = {
  title: "Forms/TextInput",
  component: TextInput,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    label: {
      control: "text",
    },

    placeholder: {
      control: "text",
    },

    error: {
      control: "text",
    },

    disabled: {
      control: "boolean",
    },

    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "number",
      ],
    },
  },
};


export default meta;


type Story = StoryObj<typeof TextInput>;


export const Default: Story = {
  args: {
    label: "Nombre completo",
    placeholder: "Ingrese su nombre",
    type: "text",
  },
};


export const WithError: Story = {
  args: {
    label: "Correo electrónico",
    placeholder: "ejemplo@correo.com",
    type: "email",
    error: "El correo electrónico no es válido",
  },
};


export const Disabled: Story = {
  args: {
    label: "Cédula",
    placeholder: "Ingrese su cédula",
    disabled: true,
  },
};

export const Filled: Story = {
  args: {
    label: "Carrera",
    defaultValue: "Ingeniería en Informática",
  },
};


export const Required: Story = {
  args: {
    label: "Nombre de usuario",
    placeholder: "Usuario",
    required: true,
  },
};