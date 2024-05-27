import React, { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFields from "../../constants/InputFields";
import {OrganisationSettingsFormProps} from "../../types/PagesTypes"
import { defaultStyle, InputStyle } from "../../constants/customInputStyles";
import {useOrganizationDataHook} from "../../hooks/useOrganizationDataHook.hooks"
import Select from "react-select";
import { isNotEmpty } from "../../constants/functionalLogics";

const formDefaultValues = {
    organizationName: "",
    departName: {},
    divisionName: {}
  };

  const defaultOptions = [
    {
      label: "Kazim",
      value: "Agha",
    },
    {
      label: "Systems",
      value: "Limited",
    }
  ]

const OrganizationInformationForm: React.FC<OrganisationSettingsFormProps> = ({ onNext, onPrevious, data }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { organisationLists, departments, divisions, handleOrganisationSearch, fetchDepartments, fetchDivisions } = useOrganizationDataHook(searchTerm);
  const [suggestions, setSuggestions] = useState<any>([]);
  const [suggestionsDept, setSuggestionsDept] = useState<any>([]);
  const [suggestionsDivision, setSuggestionsDivision] = useState<any>([]);

    const Schema = yup.object({
        organizationName: yup.string().required("Organzation Name is required" as string),
        departName: yup.object().required("Department Name is required" as string),
        divisionName: yup.object().required("Division is required" as string),
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

    useEffect(() => {
      fetchDepartments("");
      fetchDivisions("")
    }, [])
    const onSubmit = (data: any) => {
      onNext({...data})
    }
    const handleSearchChange = async (event: any) => {
      const value = event.target.value;
      setSearchTerm(value);
      setValue("organizationName", value)
      if(value.trim !== ""){
        handleOrganisationSearch(value)
      }
    };

    const handleSearchChangeDept = async (event: any) => {
      const value = event.value;
      setValue("departName", event)
      if(value.trim !== ""){
        handleOrganisationSearch(value)
      }
    };

    const handleSearchChangeDivision = async (event: any) => {
      const value = event.value;
      setValue("divisionName", event)
      if(value.trim !== ""){
        handleOrganisationSearch(value)
      }
    };

    useEffect(() => {
      if(organisationLists.length > 0) {
        if (searchTerm !== "") {
            const filteredSuggestions = organisationLists.filter((item: any) =>
              item?.organisationName?.toLowerCase().includes(searchTerm?.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
          } else {
            setSuggestions([]);
          }
      }
    } , [organisationLists])

    useEffect(() => {
      if(departments.length > 0){
        const array: any = []
        departments.map((item: any) => {
          array.push({
            label: item?.departmentName,
            value: item?.departmentKey
          })
        })
        setSuggestionsDept(array);
      }
    }, [departments])

    useEffect(() => {
      if(divisions.length > 0){
        const array: any = []
        divisions.map((item: any) => {
          array.push({
            label: item?.divisionName,
            value: item?.divisionKey
          })
        })
        setSuggestionsDivision(array);
      }
    }, [departments])

    const handleSuggestionClick = (suggestion: any) => {
      setSearchTerm(suggestion?.organisationName);
      setValue("organizationName", suggestion.organisationName)
      fetchDepartments(suggestion.organisationKey)
      setSuggestions([]);
    };

    useEffect(() => {
      if(isNotEmpty(data)){
        const { organizationName, divisionName, departName } = data;
        setValue("organizationName", organizationName)
        setValue("departName", departName)
        setValue("divisionName", divisionName)
      }
    }, [data])

    return (
        <div className=" mx-auto p-6  shadow rounded-lg" >
        <h2 className="text-2xl font-semibold mb-6 bg-[#1B365D] text-[#E1EED6]">Step 2: Organization Information Page</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col justify-start items-start w-[33%]">
                <label className="mt-6  text-tertiary-250 font-[500] md:text-[14px] md:leading-5">
                  Organization Name
                </label>
                <Controller
                  name="organizationName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, name, value, ref } }: any) => (
                    <div>
                        <input
                          ref={ref}
                          type="text"
                          name={name}
                          value={value}
                          onChange={(e: any) => {
                            handleSearchChange(e)
                          }}
                          placeholder={""}
                          className={InputStyle}
                      />
                      {suggestions.length > 0 && (
                        <ul style={{ border: '1px solid #ccc', marginTop: '0', paddingLeft: '0', listStyleType: 'none', width: '200px' }}>
                          {suggestions.map((suggestion: any, index: string) => (
                            <li
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#f9f9f9' }}
                            >
                              {suggestion.organisationName}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                />
                {errors.organizationName && (
                  <div className="mt-3 text-red-500 flex w-full">
                    {(errors.organizationName as any).message}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-start items-start w-[50%]">
                <label className="mt-6  text-tertiary-250 font-[500] md:text-[14px] md:leading-5">
                  Department
                </label>
                <Controller
                  name="departName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, name, value, ref } }: any) => (
                    <Select 
                      options={getValues("organizationName") !== "" ? suggestionsDept as any : [{}]}
                      onChange={handleSearchChangeDept}
                      name={name}
                      value={value}
                      ref={ref}
                      styles={defaultStyle}
                    />
                  )}
                />
                {errors.departName && (
                  <div className="mt-3 text-red-500">
                    {(errors.departName as any).message}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-start items-start w-[33%]">
                <label className="mt-6  text-tertiary-250 font-[500] md:text-[14px] md:leading-5">
                  Division
                </label>
                <Controller
                  name="divisionName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, name, value, ref } }: any) => (
                    <Select 
                      options={(getValues("departName") as any)?.label !== "" ? suggestionsDivision as any : []}
                      onChange={handleSearchChangeDivision}
                      name={name}
                      value={value}
                      ref={ref}
                      styles={defaultStyle}
                    />
                  )}
                />
                {errors.divisionName && (
                  <div className="mt-3 text-red-500">
                    {(errors.divisionName as any).message}
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

export default OrganizationInformationForm;