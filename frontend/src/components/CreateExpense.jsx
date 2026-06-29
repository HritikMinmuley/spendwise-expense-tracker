// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from './ui/label'
import { Input } from './ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2 } from 'lucide-react'
import api from "../lib/axios";
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setExpenses } from '@/redux/expenseSlice'

const CreateExpense = () => {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        category: ""
    })

    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();
    const {expenses} = useSelector(store=>store.expense)


    const changeEventHandler = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const changeCategoryHandler = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            category: value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(formData)
        try {
            setLoading(true)
            const res = await api.post("/expense/add", formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (res.data.success) {
                dispatch(setExpenses([...expenses,res.data.expense]))
                toast.success(res.data.message)
                setIsOpen(false)
            }
        } catch (error) {
            console.log("Submit error:")
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} variant="outline">Add New Expense</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                    <DialogDescription>
                        Create expense to hear. Click add when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                placeholder="description"
                                className="col-span-3"
                                name="description"
                                value={formData.description}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                placeholder="&#8377;"
                                className="col-span-3"
                                name="amount"
                                value={formData.amount}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <Select onValueChange={changeCategoryHandler} >
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="living">Living</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="transportation">Transportation</SelectItem>
                                    <SelectItem value="health">Health</SelectItem>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                    <SelectItem value="entertainment">Entertainment</SelectItem>
                                    <SelectItem value="travel">Travel</SelectItem>
                                    <SelectItem value="others">Others</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        {
                            loading ? <Button className="w-full my-4">
                                <Loader2 className="mr-2 h-4 animate-spin" />
                                Please wait
                            </Button> :
                                <Button type="submit">Add</Button>
                        }

                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
};

export default CreateExpense





