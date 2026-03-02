type FilterChipsProps = {
  options: string[];
  active: string;
  onChange: (tag: string) => void;
  label: string;
};

export function FilterChips({ options, active, onChange, label }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label={label}>
      {options.map((option) => {
        const selected = active === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={[
              "rounded-full border px-3 py-1.5 text-sm font-medium transition",
              selected
                ? "border-sky-600 bg-sky-600 text-white"
                : "border-slate-400 bg-slate-50 text-slate-900 hover:border-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500"
            ].join(" ")}
            aria-pressed={selected}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
