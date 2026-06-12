import { ListOrdered } from "lucide-react";

interface Props {
  instructions: string[];
}

function InstructionsSection({ instructions }: Props) {
  return (
    <div
      className="
        rounded-2xl
        bg-white
        border
        border-slate-100
        shadow-sm
        p-6
      "
    >
      {/* Section header */}
      <div
        className="
          flex
          items-center
          gap-3
          pb-4
          mb-4
          border-b
          border-slate-100
        "
      >
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-[#FAEEDA]
            text-[#854F0B]
          "
        >
          <ListOrdered size={16} />
        </div>

        <h2 className="text-sm font-semibold text-slate-800">
          Instructions
        </h2>

        <span
          className="
            ml-auto
            rounded-full
            border
            border-slate-200
            bg-slate-50
            px-2.5
            py-0.5
            text-[11px]
            font-medium
            text-slate-500
          "
        >
          {instructions.length} steps
        </span>
      </div>

      {/* Steps */}
      <ol className="flex flex-col gap-2.5">
        {instructions.map((item, index) => (
          <li
            key={item}
            className="
              flex
              items-start
              gap-3
              rounded-lg
              border
              border-slate-100
              bg-slate-50
              px-3
              py-2.5
              text-sm
              text-slate-700
              leading-relaxed
            "
          >
            <span
              className="
                flex
                h-5
                w-5
                shrink-0
                mt-0.5
                items-center
                justify-center
                rounded-full
                bg-[#0B2D63]
                text-[11px]
                font-semibold
                text-white
              "
            >
              {index + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default InstructionsSection;
