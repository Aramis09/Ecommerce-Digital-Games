import styles from "./PaginateProducts.module.scss";

export const PaginateProducts = ({
  changePageHanlder,
  setProductList,
}: any): JSX.Element => {
  return (
    <div className={styles.paginate}>
      <button
        value="1"
        onClick={(evt) => {
          setProductList([]);
          changePageHanlder(evt);
        }}
      >
        1
      </button>
      <button
        value="2"
        onClick={(evt) => {
          setProductList([]);
          changePageHanlder(evt);
        }}
      >
        2
      </button>
      <button
        value="3"
        onClick={(evt) => {
          setProductList([]);
          changePageHanlder(evt);
        }}
      >
        3
      </button>
      <button
        value="4"
        onClick={(evt) => {
          setProductList([]);
          changePageHanlder(evt);
        }}
      >
        4
      </button>
      <button
        value="5"
        onClick={(evt) => {
          setProductList([]);
          changePageHanlder(evt);
        }}
      >
        5
      </button>
      <button
        value="6"
        onClick={(evt) => {
          setProductList([]);
          changePageHanlder(evt);
        }}
      >
        6
      </button>
    </div>
  );
};
