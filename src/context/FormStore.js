import { create } from "zustand";

export const useFormStore = create((set) => ({
  // Initial form values
  form: {
    subject: "",
    level: "",
    duration: "",
    goals: [],
    resources: [],
    constraints: [],
  },

  // Update any single field
  setField: (field, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
    })),

  // Reset form after roadmap generation or logout
  resetForm: () =>
    set({
      form: {
        subject: "",
        level: "",
        duration: "",
        goals: [],
        resources: [],
        constraints: [],
      },
    }),
}));
