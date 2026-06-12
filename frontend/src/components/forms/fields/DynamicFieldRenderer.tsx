import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

export interface DynamicField {
  name: string;
  label: string;
  type: "text" | "select" | "textarea";
  options?: { label: string; value: string }[];
}

interface Props<T extends Record<string, any>> {
  fields: DynamicField[];
  values: Partial<T>;
  setValue: (name: any, value: any) => void; 
  errors: Record<string, any>;
}

export default function DynamicFieldRenderer<T extends Record<string, any>>({
  fields,
  values,
  setValue,
  errors,
}: Props<T>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((field) => {
        if (field.type === "text") {
          return (
            <TextInput
              key={field.name}
              label={field.label}
              value={values[field.name] || ""}
              onChange={(e) =>
                setValue(field.name, e.target.value)
              }
              error={errors[field.name]?.message || errors[field.name]}
            />
          );
        }

        if (field.type === "select") {
          return (
            <SelectInput
              key={field.name}
              label={field.label}
              options={field.options || []}
              value={values[field.name] || ""}
              onChange={(val) => setValue(field.name, val)}
              error={errors[field.name]?.message || errors[field.name]}
            />
          );
        }

        return null;
      })}
    </div>
  );
}