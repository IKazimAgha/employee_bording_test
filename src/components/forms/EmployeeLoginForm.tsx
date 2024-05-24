import React, { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFields from "../../constants/InputFields";
import {EmployeeLoginPageProps} from "../../types/PagesTypes"

const inputStyle = ` 
    w-full
    md:w-[325px]  
    lg:w-[388px]  
    xl:w-[388px]
    px-4 
    py-3 
    mt-3 
    my-1
    border-lightShade2   
    outline-bluerega   
    rounded-md  
    border   
    focus:border-lightShade2 
    bg-white
    `;
    const checkBoxInputStyle = ` 
    w-full
    md:w-[325px]  
    lg:w-[388px]  
    xl:w-[388px]
    px-4 
    py-3 
    mt-6 
    my-1
    border-lightShade2   
    outline-bluerega   
    rounded-md  
    border   
    focus:border-lightShade2 
    bg-white
    `;


const formDefaultValues = {
    giveLogin: "",
    email: "",
  };


const EmployeeLoginPage: React.FC<EmployeeLoginPageProps> = ({ onNext, onPrevious }) =>  {

  const [isLoginGiven, setIsLoginGiven] = useState<boolean>(false)

    const Schema = yup.object({
        giveLogin: yup.string().nullable(),
        email: yup.string().nullable()
      });

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        reset,
        control,
        watch,
        getValues,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(Schema),
        mode: "onChange",
        defaultValues: formDefaultValues,
      });

    const onSubmit = (data: any) => {
      onNext({...data})
    }

    console.log("watching student checkbox", !!watch("giveLogin") === true)

    return (
        <div className="mx-auto p-6  shadow rounded-lg" >
          
        <h2 className="text-2xl font-semibold mb-6 bg-[#1B365D] text-[#E1EED6]">Step 3: Student Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row justify-start items-start w-[100%]">
                <label className="mt-6 flex w-full text-tertiary-250 font-[500] md:text-[14px] md:leading-5">
                  Give student their own login:
                </label>
                <Controller
                  name="giveLogin"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, name, value, ref } }: any) => (
                    <input
                        ref={ref}
                        type="checkbox"
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={""}
                        className={checkBoxInputStyle}
                    />
                  )}
                />
                {errors.giveLogin && (
                  <div className="mt-3 text-red-500 flex w-full">
                    {(errors.giveLogin as any).message}
                  </div>
                )}
              </div>
              {
                !!watch("giveLogin") === true && (
                  <div className="flex flex-col justify-start items-start w-[33%]">
                    <label className="mt-6  text-tertiary-250 font-[500] md:text-[14px] md:leading-5">
                      Email
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, name, value, ref } }: any) => (
                          <input
                            ref={ref}
                            type="text"
                            name={name}
                            value={value}
                            onChange={onChange}
                            placeholder={""}
                            className={inputStyle}
                        />
                      )}
                    />
                    {errors.email && (
                      <div className="mt-3 text-red-500">
                        {(errors.email as any).message}
                      </div>
                    )}
                  </div>
                )
              }
              <div className="flex justify-between my-5">
                  <button className="uppercase text-[#BF524D] rounded-md mt-8 border-[#BF524D] border-2 font-semibold text-[14px] py-4 px-6" type="button" onClick={() => onPrevious()}>
                    Previous
                  </button>
                  <button className="uppercase text-[#4297A3] rounded-md mt-8 border-[#4297A3] border-2 font-semibold text-[14px] py-4 px-6" type="submit">
                    Next
                  </button>
              </div>
            </form>
        </div>
    )
}

export default EmployeeLoginPage;