# Form controls (ui)

| Component | Props | Notes |
|---|---|---|
| `ChipGroup` | `options [{value,label}]`, `value string[]`, `onToggle(value)`, `label` | Multi-select pills |
| `SegmentedControl` | `options`, `value`, `onChange(value)`, `label` | Single-select toggle |
| `RangeInput` | `label`, `required`, `from`, `to`, `onFromChange`, `onToChange`, `fromPlaceholder`, `toPlaceholder`, `ariaPrefix`, `error` | Two digit-only inputs (`NumberInput`) |
| `SuffixNumberInput` | `label`, `suffix`, `value`, `onChange`, `placeholder`, `id` | Digit-only input with a unit (years, min) |
| `FileButton` | `label`, `accept`, `fileName`, `onSelect(File)`, `onRemove` | Single-file upload with chosen-file chip |
| `FieldLabel` | `required`, `hint`, `htmlFor` | Label for custom controls |
| `Textarea` | same as `Input` (`label`, `error`, `rows`) | |
