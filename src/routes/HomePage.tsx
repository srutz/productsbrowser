import { useFormState } from "@/hooks/useFormState";
import { z } from "zod";




type MySelectProps = {
  options: { key: string, label: string }[],
  value: string,
  onChange: (value: string) => void
}

function MySelect({ options, value, onChange }: MySelectProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} >
      {options.map((options) => <option value={options.key}>{options.label}</option>)}
    </select>
  )
}


function isValidEmail(email: string) {
  if (!email?.trim())
    return true
  const emailSchema = z.email();
  return emailSchema.safeParse(email).success;
}



export function HomePage() {
  //const [name, setName] = useSessionStorage("about.name", '')
  //const [email, setEmail] = useSessionStorage("about.email", '')
  /*
  const [form, setForm] = useState({
    name: "",
    email: "",
    topping: "thuna",
  })
  */
  const { form, setForm } = useFormState()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
  console.log("RERENDER")
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">

        <MySelect
          options={[
            { key: "oliv", label: "Oliven" }, { key: "thuna", label: "Thunfisch" }
          ]}
          value={form.topping}
          onChange={(v) => setForm({ ...form, topping: v })} />

        <label>Name:
          <input
            type="text" value={form.name} onChange={(e) => {
              setForm({
                ...form,
                name: e.target.value,
              })
            }}
          />
        </label>
        <label>Email:
          <input
            type="email" value={form.email} onChange={(e) => {
              setForm(modify(form, (f) => f.email = e.target.value))
            }}
          />
        </label>
        {isValidEmail(form.email) || <div className="text-red-500">Die Email ist ungültig</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


function modify<T>(form: T, fn: (form: T) => void) {
  const newForm = structuredClone(form) // deep copy
  fn(newForm)
  return newForm;
}
