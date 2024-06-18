import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, increaseByAmount } from './counterSlice';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Counter REDUX</h1>
      <div className='counter-container'>
        <button className='item' onClick={() => dispatch(increment())}>
          +
        </button>
        <span className='item'>{count}</span>
        <button className='item' onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
    </>
  );
}

export default App;
