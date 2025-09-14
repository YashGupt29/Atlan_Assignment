import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import BoardNavbar from "./_components/board-navbar";
import Navbar from "../Dashboard/_components/navbar";
import CardModal from "./_components/modals/card-Modal";

const BoardIdLayout = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const board = useSelector((state) =>
    state.board.boards.find((b) => b.id === boardId)
  );
  
  if (!board) {
    navigate("/not-found"); 
    return null;
  }
  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl || board.imageThumbUrl})` }}
>
      <Helmet>
        <title>{board.title || "Board"}</title>
      </Helmet>
      <Navbar />
      <BoardNavbar data={board} />
      <div className="absolute bg-black/10 inset-0" />
      <main className="relative pt-28 h-full">
        <Outlet/>
        <CardModal boardId={boardId}/>
      </main>
    </div>
  );
};

export default BoardIdLayout;
