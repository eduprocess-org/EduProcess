import { ClipboardList } from "lucide-react";

interface Props {
  requirements: string[];
}

function RequirementsSection({ requirements }: Props) {
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
            bg-[#EEF2FA]
            text-[#0B2D63]
          "
        >
          <ClipboardList size={16} />
        </div>

        <h2 className="text-sm font-semibold text-slate-800">
          Requirements
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
          {requirements.length} items
        </span>
      </div>

      {/* Items */}
      <ul className="flex flex-col gap-2">
        {requirements.map((item) => (
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
                mt-[7px]
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-[#0B2D63]
              "
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequirementsSection;
