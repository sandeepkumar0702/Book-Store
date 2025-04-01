import orderReducer, { setPrevOrdersList, resetPrevOrdersList } from "../services/slice/orderSlice";

const initialState = { prevOrdersList: [] };

describe("orderSlice reducer", () => {
    test("should return the initial state when passed an empty action", () => {
        const result = orderReducer(undefined, { type: "" });
        expect(result).toEqual(initialState);
    });
    

    test("should add new orders to the prevOrdersList", () => {
        const previousState = { prevOrdersList: [{ id: 1, item: "Pizza" }] };
        const newOrders = [{ id: 2, item: "Burger" }];
        const action = setPrevOrdersList(newOrders);
        const result = orderReducer(previousState, action);
        expect(result.prevOrdersList).toEqual([...newOrders, ...previousState.prevOrdersList]);
    });

    test("should reset prevOrdersList to an empty array", () => {
        const previousState = { prevOrdersList: [{ id: 1, item: "Pizza" }] };
        const action = resetPrevOrdersList();
        const result = orderReducer(previousState, action);
        expect(result.prevOrdersList).toEqual([]);
    });
});
