export const InputStyle = ` 
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

export const checkBoxInputStyle = ` 
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

export let defaultStyle = {
    control: (base: any) => ({
      ...base,
      height: 49,
      width: 390,
      color: "#495770",
      fontSize: "16px",
      borderRadius: "7px",
      boxShadow: "none",
      "&:hover": {
        outline: "red",
      },
    }),
    option: (provided: any, state: any) => ({ 
      ...provided,
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: state.data.color,
      // fontSize: state.selectProps.myFontSize,
      fontSize: "16px",
      border: 0,
    }),
  };

export let picturePreviewCSS = { 
  width: '300px',
  height: '300px',
  marginTop: "20px"
}