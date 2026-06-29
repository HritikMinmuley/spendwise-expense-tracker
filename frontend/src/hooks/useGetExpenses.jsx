import { setExpenses } from "@/redux/expenseSlice";
import api from "../lib/axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

const useGetExpenses = ()=>{
    const dispatch = useDispatch()
    const {category,markAsDone} = useSelector(store=>store.expense);

    useEffect(()=>{
        const fetchExpenses = async()=>{
            try { 
                const res = await api.get(`/expense/getall?category=${category}&done=${markAsDone}`)
                if(res.data.success){
                    dispatch(setExpenses(res.data.expense))
                }
            } catch (error) {
                console.log("FetchExpense Error:")
                console.log(error)
            }
        }
        fetchExpenses();
    },[dispatch,category,markAsDone])

}

export default useGetExpenses;