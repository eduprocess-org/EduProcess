import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import SelectInput from "../../components/forms/fields/SelectInput";


const meta: Meta<typeof SelectInput> = {
  title: "Forms/SelectInput",
  component: SelectInput,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    label: {
      control: "text",
    },

    error: {
      control: "text",
    },

    value: {
      control: "text",
    },
  },
};


export default meta;


type Story = StoryObj<typeof SelectInput>;


// Wrapper para manejar estado interno
const Template = (args: any) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <SelectInput
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};


export const Default: Story = {
  render: Template,

  args: {
    label: "Carrera",

    options: [
      {
        label: "Ingeniería en Informática",
        value: "informatica",
      },
      {
        label: "Ingeniería Civil",
        value: "civil",
      },
      {
        label: "Diseño Industrial",
        value: "diseno",
      },
    ],
  },
};



export const WithError: Story = {
  render: Template,

  args: {
    label: "Seleccione una carrera",

    options: [
      {
        label: "Computación",
        value: "computacion",
      },
      {
        label: "Mecánica",
        value: "mecanica",
      },
    ],

    error: "Debe seleccionar una opción",
  },
};



export const SelectedValue: Story = {
  render: Template,

  args: {
    label: "Estado",

    value: "approved",

    options:[
      {
        label:"Aprobado",
        value:"approved",
      },
      {
        label:"Pendiente",
        value:"pending",
      },
    ],
  },
};