type CheckboxProps = {
  checked: boolean
  onChange: () => void
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
    return (
    <label className="flex items-center cursor-pointer">
        <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
        />

        <div className="w-5 h-5 flex items-center justify-center rounded border border-amber-400 peer-checked:bg-amber-500 peer-checked:border-amber-500 transition">
        <svg
            className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        </div>
    </label>
    )
}