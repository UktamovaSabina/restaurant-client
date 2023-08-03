import { createStore } from "redux";

const dataReducer = (state = { foods: [] }, action) => {
    if (action.type === "data") {
        if (!state.foods.includes(action.food))
            return {
                foods: [...state.foods, action.food]
            };
    }


    return state
}

const store = createStore(dataReducer);

export default store;