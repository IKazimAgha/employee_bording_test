import React, { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {EmployeeLoginPageProps} from "../../types/PagesTypes"
import { isNotEmpty } from "../../constants/functionalLogics";
import { checkBoxInputStyle, InputStyle } from "../../constants/customInputStyles";

const formDefaultValues = {
    giveLogin: false,
    email: "",
  };


const EmployeeLoginPage: React.FC<EmployeeLoginPageProps> = ({ onNext, onPrevious, data }) =>  {

    const Schema = yup.object({
        giveLogin: yup.boolean().nullable(),
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

    useEffect(() => {
      if(isNotEmpty(data)){
        const {giveLogin, email} = data;
        setValue("giveLogin", giveLogin)
        setValue("email", email)
      }
    }, [data])

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
                        checked={getValues("giveLogin") || false}
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
                            className={InputStyle}
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