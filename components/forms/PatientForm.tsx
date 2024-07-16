"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

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


 
const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      const userData = {name,email,phone};

      const user = await createUser(userData);
      
      if(user) router.push(`/patients/${user.$id}/register`);   // ``  it is called as Template String

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋🏻</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        
        
        <CustomFormField //*******when we copy this entire CustomFormField component, we can reuse it; like how we use it for email*****
        //We are passing the props to CustomFormField, to reuse the code
        fieldType={FormFieldType.INPUT} //enum will be set to field type
        control = {form.control}
        name="name" //the unique will sent to CustomFormField
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="User"
        />

        <CustomFormField 
        //We are passing the props to CustomFormField, to reuse the code
        fieldType={FormFieldType.INPUT} //enum will be set to field type
        control = {form.control}
        name="email" //the unique will sent to CustomFormField
        label="Email"
        placeholder="john@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
        />

        <CustomFormField //we need to pass the props to CustomFormField, for above two it has INPUT, for this it has PHONE_INPUT
        //We are passing the props to CustomFormField, to reuse the code
        fieldType={FormFieldType.PHONE_INPUT} //enum will be set to field type
        control = {form.control}
        name="phone" //the unique will sent to CustomFormField
        label="Phone number"
        placeholder="(+91) 99999-55555"
        />
     
      <SubmitButton isLoading={isLoading}>
         Get Started
      </SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm