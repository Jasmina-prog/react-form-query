import { Select, Form, Input, Button, Checkbox } from "antd"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import axios from "axios"
import { useQuery, useMutation } from "@tanstack/react-query"

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



function FormPage(){
    const {handleSubmit, control} = useForm()
    // const {fields} = useFieldArray()

    async function getData(){
        return await axios.get('https://jsonplaceholder.typicode.com/posts')
    }

    const {data, isLoading} = useQuery({
        queryKey: ["usersData"],
        queryFn: getData,
    })
    console.log(data);

    async function postData() {
        return await axios.post("https://jsonplaceholder.typicode.com/posts"), userData
    }

    const {data: dataForPost, mutate} = useMutation(
        {
            mutationFn: postData
        }
    )
    console.log(dataForPost);
    
    const onSubmitFn = (data) =>{ 
        mutate(data)
    }

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

        </Form>

        <Button onClick={handleSubmit(onSubmitFn)}> Create </Button>
        </>
    )
}

export default FormPage