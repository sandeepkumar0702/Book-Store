import bookReducer, { setBookList, resetBookList, setLoading } from "../services/slice/bookSlice";


const initialState = {
    bookList: [],
    loading: false,
};

describe("bookSlice reducer", () => {
    it("should return the initial state when passed an empty action", () => {
        const result = bookReducer(undefined, { type: "unknown" });
        expect(result).toEqual(initialState);
    });

    it("should handle setBookList action", () => {
        const mockBooks = [
            {
                bookName: "Test Book",
                author: "Author Name",
                rating: 4.5,
                price: 200,
                discountPrice: 150,
                _id: "1",
                quantity: 10,
            },
        ];
        const action = setBookList(mockBooks);
        const result = bookReducer(initialState, action);
        expect(result.bookList).toEqual(mockBooks);
    });

    it("should handle resetBookList action", () => {
        const prevState = {
            bookList: [{ _id: "1", bookName: "Test", author: "Author", rating: 4, price: 100, discountPrice: 80, quantity: 5 }],
            loading: false,
        };
        const action = resetBookList();
        const result = bookReducer(prevState, action);
        expect(result.bookList).toEqual([]);
    });

    it("should handle setLoading action", () => {
        const action = setLoading(true);
        const result = bookReducer(initialState, action);
        expect(result.loading).toBe(true);
    });
});
