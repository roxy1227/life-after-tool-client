import { proxy } from 'valtio'
import { State, FormItem } from './type'

const state = proxy<State>({
    form_item: {} as FormItem
})

const reducer = {
    setFormItem: (form_item: FormItem) => {
        state.form_item = form_item
    }
}

export default {
    state,
    reducer
}
