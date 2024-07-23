import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({params: { userId }}: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[800px] flex-1 flex-col py-10">
          <Image src="/assets/icons/logo-full.svg" width={1000} height={1000} alt="Logo" className="mb-12 h-10 w-fit" />
         
          <RegisterForm user={user}/> 
          <p className="copyright py-10">
            © 2024 CaresU
          </p>
          
        </div>
      </section>
      <Image src="/assets/images/register-img.png" height={1000} width={1000} alt="Welcome-Image"  className="side-img max-w-[50%] object-cover" 
  style={{ objectPosition: 'center +35%' }}  />
    </div>
  )
}

export default Register