import { create } from "zustand"
import { persist } from "zustand/middleware"

type FormContent = { name: string, email: string, topping: string }

type FormStateType = {
  form: FormContent
  setForm: (form: FormContent) => void
}

export const useFormState = create<FormStateType>()(
  persist(
    (set) => ({
      form: { email: "", name: "", topping: "thuna" },
      setForm: (form: FormContent) =>
        set({ form }),
    }),
    { name: "form-state" }
  )
)
