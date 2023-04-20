import { addProductInShoppingCart } from "../../redux/actions/shoppingCartAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { RootState } from "../../redux/store";
import { CardPropsType } from "../../types";
interface ButtonAddShoopingCartType {
  id: number;
  productData: CardPropsType;
}
export default function ButtonAddShoopingCart({
  id,
  productData,
}: ButtonAddShoopingCartType): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );

  const handlerAddProductShoppingCart = () => {
    dispatch(
      user
        ? addProductInShoppingCart(user.email, id, null)
        : addProductInShoppingCart("noLoginUser", id, productData)
    );
  };

  return (
    <>
      <button
        // className={changeClass.classButton}
        type="button"
        onClick={handlerAddProductShoppingCart}
      >
        Add To Cart
      </button>
    </>
  );
}
