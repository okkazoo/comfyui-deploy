import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

interface FormProps<T extends z.ZodType> {
  formSchema: T
  values: Record<string, string>
  onValuesChange: (values: Record<string, string>) => void
  onSubmit: () => void
  className?: string
  children?: React.ReactNode
}

export function Form<T extends z.ZodType>({
  formSchema,
  values,
  onValuesChange,
  onSubmit,
  className,
  children
}: FormProps<T>) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: values
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
      {children}
    </form>
  )
} 