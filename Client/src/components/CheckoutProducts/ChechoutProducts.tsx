import styles from "../../pages/CheckOut/CheckOut.module.scss";
import discountIcon from "../../assets/discount-2.svg";
import { ShoppingCartType } from "../../redux/interfaces/shoppingCartInterface";
interface props {
  products: ShoppingCartType[];
}
const CheckoutProducts = ({ products }: props) => {
  return (
    <div>
      <div className={styles["items-container"]}>
        <h4>Products</h4>
        <div className={styles["card-container"]}>
          {products.map((game: any, index) => (
            <div key={index} className={styles["card-item"]}>
              <img src={game.background_image} />
              <h5>{game.name}</h5>
              <p>${game.price}</p>
            </div>
          ))}
          <p className={styles.price}>
            Amount Payable: ${"totalAmount,tengo que agregar"}
          </p>
          <div className={styles.finalDiscount}>
            <img src={discountIcon} alt="" />
            <p className={styles.price}>
              Final Price Discount: ${"price total"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProducts;
