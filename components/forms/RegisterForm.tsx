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
import { Doctors, GenderOptions } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";




 
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
          <h2 className="sub-header">Personal Information</h2>
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
                    {GenderOptions.map((option) => (
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
            <CustomFormField 
            //We are passing the props to CustomFormField, to reuse the code
            fieldType={FormFieldType.INPUT} //enum will be set to field type
            control = {form.control}
            name="address" //the unique will sent to CustomFormField
            label="Address"
            placeholder="streets, city, state, country"
            
            />  

            <CustomFormField 
             //We are passing the props to CustomFormField, to reuse the code
             fieldType={FormFieldType.INPUT} //enum will be set to field type
             control = {form.control}
             name="occupation" //the unique will sent to CustomFormField
             label="Occupation"
             placeholder="Software Engineer"
             
             />  
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
            //We are passing the props to CustomFormField, to reuse the code
            fieldType={FormFieldType.INPUT} //enum will be set to field type
            control = {form.control}
            name="emergencyContactName" //the unique will sent to CustomFormField
            label="Emergency Contact Name"
            placeholder="Guardian's Name"
            />  

            <CustomFormField //we need to pass the props to CustomFormField, for above two it has INPUT, for this it has PHONE_INPUT
            //We are passing the props to CustomFormField, to reuse the code
            fieldType={FormFieldType.PHONE_INPUT} //enum will be set to field type
            control = {form.control}
            name="emergencyContactNumber" //the unique will sent to CustomFormField
            label="Emergency Contact Number"
            placeholder="(+91) 99999-55555"
            />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField //we need to pass the props to CustomFormField, for above two it has INPUT, for this it has PHONE_INPUT
            //We are passing the props to CustomFormField, to reuse the code
            fieldType={FormFieldType.SELECT} //enum will be set to field type
            control = {form.control}
            name="primaryPhysician" //the unique will sent to CustomFormField
            label="Primary Physician"
            placeholder="Select a Physician"
          >
           {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image 
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className="rounded-full border border-dark-500" 
                  />
                  <p>{doctor.name}</p>
                </div>
            </SelectItem>
           ))}
          </CustomFormField>
          
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
            //We are passing the props to CustomFormField, to reuse the code
            fieldType={FormFieldType.INPUT} //enum will be set to field type
            control = {form.control}
            name="insuranceProvider" //the unique will sent to CustomFormField
            label="Insurance Provider"
            placeholder="Policy Bazaar Insurance"
            
            />  

            <CustomFormField 
             //We are passing the props to CustomFormField, to reuse the code
             fieldType={FormFieldType.INPUT} //enum will be set to field type
             control = {form.control}
             name="insurancePolicyNumber" //the unique will sent to CustomFormField
             label="Insurance Policy Number"
             placeholder="ABC78787878"
             
             />  
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField 
              //We are passing the props to CustomFormField, to reuse the code
              fieldType={FormFieldType.TEXTAREA} //enum will be set to field type
              control = {form.control}
              name="allergies" //the unique will sent to CustomFormField
              label="Allergies (if any)"
              placeholder="pollen, dust, etc."
              
              />  

              <CustomFormField 
              //We are passing the props to CustomFormField, to reuse the code
              fieldType={FormFieldType.TEXTAREA} //enum will be set to field type
              control = {form.control}
              name="currentMedication" //the unique will sent to CustomFormField
              label="Current Medication (if any)"
              placeholder="paracetamol 650, Amlong 10mg, etc."
              
              />  
        </div>
        
        <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField 
              //We are passing the props to CustomFormField, to reuse the code
              fieldType={FormFieldType.TEXTAREA} //enum will be set to field type
              control = {form.control}
              name="familyMedicalHistory" //the unique will sent to CustomFormField
              label="Family Medical History"
              placeholder="Mother had diabetes, father had migraine, etc."
              
              />  

              <CustomFormField 
              //We are passing the props to CustomFormField, to reuse the code
              fieldType={FormFieldType.TEXTAREA} //enum will be set to field type
              control = {form.control}
              name="pastMedicalHistory" //the unique will sent to CustomFormField
              label="Past Medical History"
              placeholder="surgery, accident, etc."
              
              />  
        </div>
           
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>
     
      <SubmitButton isLoading={isLoading}>
         Get Started
      </SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm