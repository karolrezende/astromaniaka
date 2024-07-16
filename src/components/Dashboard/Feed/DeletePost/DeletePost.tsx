import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useState } from "react";

const DeletePost = () => {
  const [isModal, setIsModal] = useState(false);

  const handleModalPost = () => {
    setIsModal(!isModal);
  };

  return <ModalPostLayout handleModalPost={handleModalPost}>a</ModalPostLayout>;
};

export default DeletePost;
