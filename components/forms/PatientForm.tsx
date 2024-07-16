"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"

//exporting enum to CustomFormField
 export enum FormFieldType {
  //These all are the different type of Form fields that can be used in the form
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
 }
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
const PatientForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋🏻</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        
        <CustomFormField 
        //We are passing the props to CustomFormField, to reuse the code
        fieldType={FormFieldType.INPUT} //enum will be set to field type
        control = {form.control}
        name="name" //the unique will sent to CustomFormField
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="User"
        />
     
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default PatientForm