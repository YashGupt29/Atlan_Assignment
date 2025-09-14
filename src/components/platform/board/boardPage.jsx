import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ListContainer from "./_components/list-container";


const BoardIdPage = () => {
  const { boardId } = useParams();

  const lists = useSelector((state) => state.list.byBoardId[boardId] || []);


  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={boardId} data={lists} />
    </div>
  );
};

export default BoardIdPage;
