import React from 'react';

const FormContext = React.createContext()

let context;
export const useFormValidation = ({ formName, defaultValues }) => { 
    const [formValues, setFormValues] = React.useState({})
    const [errors, setErrors] = React.useState({})
    const [isDirty, setDirty] = React.useState(false)

    const handleOnChange = (event, value) => {
  
        setDirty(true)
        const val = value?.toLowerCase() ?? event.target.value
        setFormValues(prevState => ({ ...prevState, [formName]: { ...prevState[formName], [event.target.name]: val } }))
              validate(formValues[formName])
    }
   
    const isValid = React.useMemo(() => Object.values(errors[formName] ?? {}).some(error => error), [formValues, handleOnChange])
    React.useEffect(() => register(), [])
  
    const register = (values) => {
        const val = values ?? defaultValues
        Object.entries(val)
            .forEach(([key, value]) => { 
                setFormValues(prevState => ({ ...defaultValues, [formName]: { ...prevState[formName], [key]: value } }))
            })  
    }
    const validate = async (values) => 
        Object.entries(values)
            .forEach(([key, value]) =>
                setErrors(prevState =>
                    ({ ...prevState, [formName]: { ...prevState[formName], [key]: !value?.length } })))     
                
    context = React.useMemo(() => { 
        return {    
            errors, 
            register,
            validate,
            handleOnChange, 
            formValues, 
            isValid : Boolean(!isValid && isDirty)
        }
    }, [formValues])
    return context
}

const FormProvider = ({ children }) => <FormContext.Provider value={context}>{children}</FormContext.Provider>

export default FormProvider 