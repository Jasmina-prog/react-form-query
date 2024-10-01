import { Select, Form, Input, Button, Checkbox } from "antd"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const userData = [
    {
        value: 1,
        label: "UserID1"
    },
    {
        value: 2,
        label: "UserID2"
    },
    {
        value: 3,
        label: "UserID3"
    },
]

const onSubmitFn = (data) =>{
    console.log(data);   
}

function FormPage(){
    const {handleSubmit, control} = useForm()
    // const {fields} = useFieldArray()

    async function postData(){
        return await axios.post('https://jsonplaceholder.typicode.com/posts'), userData
    }

    const {data, isLoading} = useQuery({
        queryKey: ["usersData"],
        queryFn: postData,
    })

    console.log(data);
    
    return(
        <>
        <Form>
            <Controller
            name="userID"
            control={control}
            render={({ field }) =>(
                <Select {...field} options={userData} placeholder="users"/>
    )}
            />

            <Controller
            name="title"
            control={control}
            render={({ field }) =>(
                <Input {...field} placeholder="Title"/>
            )}/>

<           Controller
            name="body"
            control={control}
            render={({ field }) =>(
                <Input {...field} placeholder="Body"/>
            )}/>

            <Controller
            name="check"
            control={control}
            render={({ field }) =>(
                <Checkbox {...field}>Check</Checkbox>
            )}/>
        </Form>

        <Button onClick={handleSubmit(onSubmitFn)}> Create </Button>
        </>
    )
}

export default FormPage