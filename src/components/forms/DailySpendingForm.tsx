import React from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {DailySpendingFormProps} from "../../types/PagesTypes"
import {InputStyle} from "../../constants/customInputStyles"

const formDefaultValues = {
    speningLimit: 0,
  };

const DailySpendingForm: React.FC<DailySpendingFormProps> = ({ onNext, onPrevious }) => {
    const Schema = yup.object({
        speningLimit: yup.number()
        .positive('Daily spending limit must be a positive number')
        .required('Daily spending limit is required'),
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
    return (
        <div className="mx-auto p-6  shadow rounded-lg" >
        <h2 className="text-2xl font-semibold mb-6 bg-[#1B365D] text-[#E1EED6]">Step 4: Daily Spending Limit</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col justify-start items-start w-[100%]">
                <label className="mt-6 flex w-full text-tertiary-250 font-[500] md:text-[14px] md:leading-5">
                Daily Spending Limit:
                </label>
                <Controller
                  name="speningLimit"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, name, value, ref } }: any) => (
                    <input
                        ref={ref}
                        type="number"
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={""}
                        className={InputStyle}
                    />
                  )}
                />
                {errors.speningLimit && (
                  <div className="mt-3 text-red-500 flex w-full">
                    {(errors.speningLimit as any).message}
                  </div>
                )}
              </div>
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

export default DailySpendingForm;