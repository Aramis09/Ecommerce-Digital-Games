import { addProductToWishList } from "../../Controller/cardController";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setwishList } from "../../redux/reducer/wishReducer";
import { RootState } from "../../redux/store";
interface ButtonAddFavouritesType {
  id: number;
}
export default function ButtonAddFavourites({
  id,
}: ButtonAddFavouritesType): JSX.Element {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  const hanldeAddProductToWishList = async () => {
    const newWishList = user && (await addProductToWishList(user.email, id));
    dispatch(setwishList(newWishList));
  };

  return (
    <>
      {isAuthenticated === true && (
        <button
          // className={changeClass.classButton}
          onClick={hanldeAddProductToWishList}
        >
          Add Favourite
        </button>
      )}
    </>
  );
}
