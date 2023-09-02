import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/button/BackButton.jsx";
import Spinner from "../components/loading/Spinner.jsx";
import { useSnackbar } from "notistack";
import { SERVER_URL } from "../components/server_link.js";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${SERVER_URL}${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occured. Please check", { variant: "error" });
        console.log(error);
      });
  };
  return (
    <div className="p-10">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div
        className="flex flex-col items-center border-2
       bg-sky-400 rounded-xl w-[600px] p-8 mx-auto"
      >
        <h3 className="text-2xl">are you sure you want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >YES</button>
      </div>
    </div>
  );
};

export default DeleteBook;
