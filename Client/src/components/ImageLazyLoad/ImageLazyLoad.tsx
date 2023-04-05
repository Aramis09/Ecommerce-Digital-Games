import { LazyLoadImage } from "react-lazy-load-image-component";
interface LazyLoadTypes {
  url: string;
}
const loadGift: string =
  "https://raw.githubusercontent.com/byRedHunter/portafolio-client/main/public/placeholder.svg";

const ImageLazyLoad = ({ url }: LazyLoadTypes) => {
  return (
    <figure>
      {
        <LazyLoadImage
          src={url}
          alt="imageGame"
          width="100%"
          height="100%"
          effect="blur"
          placeholderSrc={loadGift}
        />
      }
    </figure>
  );
};
export default ImageLazyLoad;
