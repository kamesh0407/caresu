'use client'

import { FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, Field, Form } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input"
import { E164Number } from 'libphonenumber-js/core'
interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType, //enum will be set to field type
    name: string, //the unique will sent to CustomFormField
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,       //the "?" denotes it may be used or may not be
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}
//We can have multiple fields in the form, so we are creating a separate component for the field. 
//----------time saving and reusability----------//
const RenderField = ({field, props}: {field: any; props: CustomProps}) => {
    const { fieldType, iconSrc, iconAlt, placeholder } = props;
   switch (fieldType) {
    case FormFieldType.INPUT: //if the field type is INPUT
        return(
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
                {iconSrc && (
                    <Image src={iconSrc} width={24} height={24} alt={iconAlt || 'icon'}  className="ml-2"/>
                )}

                <FormControl>
                    <Input 
                        placeholder={placeholder}
                        {...field}
                        className="shad-input border-0"
                    />
                </FormControl>
            </div>
        )
    case FormFieldType.PHONE_INPUT: //if the field type is PHONE_INPUT
        return (
            <FormControl>
                <PhoneInput
                    defaultCountry="IN"
                    placeholder={placeholder}
                    international
                    withCountryCallingCode
                    value={field.value as E164Number | undefined}
                    onChange={field.onChange} 
                    className="input-phone"
                     />
            </FormControl>
        )

        default:
            break;
   }
}

const CustomFormField = (props: CustomProps) => { //passing props to CustomFormField, Get name from FieldType
    const { control, fieldType, name, label } = props;
    
  return (
    <FormField
      control={control}
      name={name}// name assigned here
      render={({ field }) => (
        <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
            )}

            <RenderField  field={field} props={props} />

            <FormMessage className="shad-error"/>

        </FormItem>
    )}
  />
  )
}

export default CustomFormField