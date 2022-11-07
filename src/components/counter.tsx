import { useReducer } from 'react';

type InitialState = {
  count: number;
  draftCount: string | number;
};

const initialState: InitialState = {
  count: 0,
  draftCount: 0,
};

const reducer = (state = initialState, action: any) => {
  console.log({ action });
  const { count, draftCount } = state;

  if (action.type === 'increment') {
    const newCount = count + 1;
    return { count: newCount, draftCount: newCount };
  }

  if (action.type === 'decrement') {
    const newCount = count - 1;
    return { count: newCount, draftCount: newCount };
  }

  if (action.type === 'reset') {
    return { count: 0, draftCount: 0 };
  }

  if (action.type === 'updateDraftCount') {
    console.log('updateDraftCount');
    return { count, draftCount: action.payload };
  }

  if (action.type === 'updateCountFromDraft') {
    return { count: Number(draftCount), draftCount };
  }

  return state;
};

const Counter = () => {
  const [{ count, draftCount }, dispatch] = useReducer(reducer, initialState);

  return (
    <section className="flex flex-col items-center w-2/3 gap-8 p-8 bg-white border-4 shadow-lg border-primary-500">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p>
      <div className="flex gap-2">
        <button onClick={() => dispatch({ type: 'decrement' })}>
          ➖ Decrement
        </button>
        <button onClick={() => dispatch({ type: 'reset' })}>🔁 Reset</button>
        <button onClick={() => dispatch({ type: 'increment' })}>
          ➕ Increment
        </button>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'updateCountFromDraft' });
          }}
        >
          <input
            type="number"
            value={draftCount}
            onChange={(e) =>
              dispatch({ action: 'updateDraftCount', payload: e.target.value })
            }
          />
          <button type="submit">Update Counter</button>
        </form>
      </div>
    </section>
  );
};

export default Counter;
