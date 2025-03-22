import { useSnapshot } from "valtio";
import IndexStore from '@/store/index'

const App = () => {
  const IndexState = useSnapshot(IndexStore.state)
  const IndexReducer = IndexStore.reducer
  return (
    <div>
      <input type="text" value={IndexState.count} />
      <button onClick={() => IndexReducer.setCount(IndexState.count + 1)}>+</button>
      <button onClick={() => IndexReducer.setCount(IndexState.count - 1)}>-</button>
      <button onClick={() => IndexReducer.fetchCount(10)}>fetch</button>
    </div>
  )
}

export default App;