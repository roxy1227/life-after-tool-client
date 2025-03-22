import { proxy } from "valtio";
import { FormItem, State } from "./type";



const state = proxy<State>({
    count: 0,
    form_item: {} as FormItem,
})

const reducer = {
    setCount: (count: number) => {
        state.count = count
    },
    setFormItem: (form_item: FormItem) => {
        state.form_item = form_item
    },
    fetchCount: async (count: number) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(count)
            }, 1000)
        })
        state.count = count
    }
}

export default {
    state,
    reducer
};