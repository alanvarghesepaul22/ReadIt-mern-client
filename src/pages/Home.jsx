import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/loading/Spinner.jsx";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { SERVER_URL } from "../components/server_link.js";
import TableBooks from "../components/viewType/TableBooks.jsx";
import CardBooks from "../components/viewType/CardBooks.jsx";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${SERVER_URL}`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1"
          onClick={() => {
            setViewType("table");
          }}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1"
          onClick={() => {
            setViewType("card");
          }}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">All Books</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : viewType == "table" ? (
        <TableBooks books={books} />
      ) : (
        <CardBooks books={books} />
      )}
    </div>
  );
};

export default Home;
