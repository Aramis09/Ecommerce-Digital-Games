import axios from "axios";
import { Comment } from "../types";
interface getCommentsType {
  id: number;
}
interface postComment extends getCommentsType {
  userComment: string;
  user: any;
  stars: number;
}
export const getAllProductComments = async ({ id }: getCommentsType) => {
  const productComments = await axios.get(
    `http://localhost:3001/user/commentProduct?productId=${id}`
  ); //productComments.data => [ {Comment: '' , date:'', id:number , productId:number, userId}, {…}, {…}, … ]
  const allCommentsObject: Comment = await productComments.data;
  return allCommentsObject;
};

export const postComment = async ({
  id,
  userComment,
  user,
  stars,
}: postComment) => {
  //Para enviar por body
  const email = user?.email;
  const image = user?.picture;

  const data = {
    email,
    productId: id,
    comment: userComment,
    date: String(new Date()).slice(0, 21),
    image,
    stars,
  };

  await axios({
    method: "post",
    url: "http://localhost:3001/user/newComment",
    data,
  });
  const newCommentObject = await getAllProductComments({ id });
  return newCommentObject;
};
