import React, { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {BasiInformationProps} from "../../types/PagesTypes"
import { InputStyle } from "../../constants/customInputStyles";

const formDefaultValues = {
    firstName: "",
    lastName: "",
    employeePicture: {}
  };

const BasicInformationForm : React.FC<BasiInformationProps> = ({ onNext }) =>{

    const [previewPicture, setPreviewPicture] = useState<any>({})
    const [showPicture, setshowPicture] = useState<boolean>(false)

    const Schema = yup.object({
        firstName: yup.string().required("First Name is required" as string),
        lastName: yup.string().required("Last Name is required" as string),
        employeePicture: yup.object().nullable()
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
      onNext({...data, photo: previewPicture})
    }

    const handleImageChange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewPicture(reader.result);
        };
        reader.readAsDataURL(file);
        setshowPicture(true);
      }
    };

    return (
        <div className="mx-auto p-6 bg-green shadow rounded-lg" >
          <h2 className="text-2xl font-semibold mb-6 bg-[#1B365D] text-[#E1EED6]">Step 1: Basic Information Page</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col justify-start items-start w-[33%]">
                <label className="mt-6  text-tertiary-250 font-[500] md:text-[14px] md:leading-5">
                  First Name
                </label>
                <Controller
                  name="firstName"
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
                {errors.firstName && (
                  <div className="mt-3 text-red-500 flex w-full">
                    {(errors.firstName as any).message}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-start items-start w-[33%]">
                <label className="mt-6  text-tertiary-250 font-[500] md:text-[14px] md:leading-5">
                  Last Name
                </label>
                <Controller
                  name="lastName"
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
                {errors.lastName && (
                  <div className="mt-3 text-red-500">
                    {(errors.lastName as any).message}
                  </div>
                )}
              </div>
              {
                showPicture ? 
                <div className="flex  flex-col justify-center">
                  <img src={previewPicture} alt="Selected" style={{ width: '300px', height: '300px', marginTop: "20px" }} />
                  
                  <button className="uppercase w-[33%] text-black rounded-md mt-8 border-red bg-red border-2 font-semibold text-[14px] py-4 px-6" onClick={() => {
                  setPreviewPicture({})
                  setshowPicture(false)
                }}>Remove Picture?</button>
                </div>
                :
                <div className="flex flex-col justify-start items-start w-[33%]">
                  <label className="mt-6  text-tertiary-250 font-[500] md:text-[14px] md:leading-5">
                    Add Picture
                  </label>
                  <input type="file" id="image-upload" onChange={(e: any) => handleImageChange(e)} name="image-upload" accept=".jpg, .jpeg, .png" />
                </div>
              }
              <div className="flex float-right my-5">
                <div>
                  <button className="uppercase text-[#4297A3] rounded-md mt-8 border-[#4297A3] border-2 font-semibold text-[14px] py-4 px-6" type="submit">
                    Next
                  </button>
                </div>
              </div>
            </form>
        </div>
    )
}

export default BasicInformationForm;