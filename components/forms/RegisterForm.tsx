"use client";
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOption } from "@/constants";
import { Label } from "../ui/label";




 
const RegisterForm = ({user}: {user: User }) => {
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
  async function onSubmit({name, email, phone }: z.infer<typeof UserFormValidation>) {
  
    setIsLoading(true);

    try {
      const userData = { name, email, phone};

      const user = await createUser(userData);
      
      if(user) router.push(`/patients/${user.$id}/register`)  // ``  it is called as Template String

    } catch (error) {
      console.log(error);
    }
     setIsLoading(false);
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Welcome 👋🏻</h1>
            <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Personal Information.</h2>
          </div>
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

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
            //We are passing the props to CustomFormField, to reuse the code
            fieldType={FormFieldType.DATE_PICKER} //enum will be set to field type
            control = {form.control}
            name="birthDate" //the unique will sent to CustomFormField
            label="Date of Birth"
            placeholder="DD/MM/YYYY"
            />  

            <CustomFormField //we need to pass the props to CustomFormField, for above two it has INPUT, for this it has PHONE_INPUT
            //We are passing the props to CustomFormField, to reuse the code
            fieldType={FormFieldType.SKELETON} //enum will be set to field type
            control = {form.control}
            name="gender" //the unique will sent to CustomFormField
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                  <RadioGroup 
                  className="flex h-11 gap-6 xl:justify-between" 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}>
                    {GenderOption.map((option) => (
                       <div key={option}
                       className="radio-group"
                       >
                          <RadioGroupItem value={option} id={option}/>
                          <Label htmlFor={option} className="cursor-pointer">
                            {option}
                          </Label>
                       </div> 
                    ))}

                  </RadioGroup>
              </FormControl>
            )}
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

        </div>


       
     
      <SubmitButton isLoading={isLoading}>
         Get Started
      </SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm