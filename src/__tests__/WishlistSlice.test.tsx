import wishListReducer, { setWishList, resetWishList, setLoading, removeFromWishlist } from '../services/slice/wishlistSlice';

const sampleBook = {
    bookName: 'Sample Book',
    author: 'John Doe',
    rating: 4.5,
    price: 100,
    discountPrice: 80,
    _id: '123',
};

describe('wishListSlice Reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            wishList: [],
            loading: false,
        };
    });

    test('should return initial state', () => {
        expect(wishListReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    test('should add a book to wishlist if not already present', () => {
        const newState = wishListReducer(initialState, setWishList(sampleBook));
        expect(newState.wishList).toHaveLength(1);
        expect(newState.wishList[0]).toEqual(sampleBook);
    });

    test('should not add duplicate books to wishlist', () => {
        const stateWithBook = { ...initialState, wishList: [sampleBook] };
        const newState = wishListReducer(stateWithBook, setWishList(sampleBook));
        expect(newState.wishList).toHaveLength(1);
    });

    test('should remove a book from wishlist if it exists', () => {
        const stateWithBook = { ...initialState, wishList: [sampleBook] };
        const newState = wishListReducer(stateWithBook, removeFromWishlist(sampleBook));
        expect(newState.wishList).toHaveLength(0);
    });

    test('should not remove a book if it does not exist in wishlist', () => {
        const newState = wishListReducer(initialState, removeFromWishlist(sampleBook));
        expect(newState.wishList).toHaveLength(0);
    });

    test('should reset wishlist', () => {
        const stateWithBooks = { ...initialState, wishList: [sampleBook, { ...sampleBook, _id: '456' }] };
        const newState = wishListReducer(stateWithBooks, resetWishList());
        expect(newState.wishList).toHaveLength(0);
    });

    test('should set loading state', () => {
        const newState = wishListReducer(initialState, setLoading(true));
        expect(newState.loading).toBe(true);
    });
});
