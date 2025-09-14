import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ListOptions from "./list-options";
import { useDispatch } from "react-redux";
import { useEventListener } from "@/hooks/useEventListener";
import {  updateListTitle, addCard } from "@/feature/slices/listSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const activitiesThemes = {
  Adventure: ["Hiking", "Riding", "Camping"],
  Party: ["Clubbing", "Karaoke", "House Party"],
  Chill: ["Reading", "Movie", "Gaming"],
};

const ListHeader = ({ data, onAddCard, boardId }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("Adventure");
  const formRef = useRef(null);
  const inputRef = useRef(null);
  const isActivities = data.title === "Activities";
  const initializedRef = useRef(false);


  const handleThemeChange = (selectedThemeValue) => {
    setSelectedTheme(selectedThemeValue);
    const activities = activitiesThemes[selectedThemeValue];

    if (activities && activities.length > 0) {
      activities.forEach((activity) => {
        const newCard = {
          id: crypto.randomUUID(),
          title: activity,
          order: data.cards.length,
          listId: data.id,
          boardId: boardId,
        };
        dispatch(addCard({ boardId: boardId, listId: data.id, card: newCard }));
        toast.success(`Added "${activity}" to ${data.title}`);
      });
    }
  };
  useEffect(() => {
    if (!isActivities) return;
    if (!initializedRef.current && data.cards.length === 0) {
      const activities = activitiesThemes["Adventure"];
      activities.forEach((activity, index) => {
        const newCard = {
          id: crypto.randomUUID(),
          title: activity,
          order: index,
          listId: data.id,
          boardId: boardId,
        };
        dispatch(addCard({ boardId, listId: data.id, card: newCard }));
      });
      initializedRef.current = true; 
    }
  }, []);
  
  

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || title === data.title) {
      return disableEditing();
    }
    dispatch(updateListTitle({ id: data.id, title }));
    toast.success(`Renamed to "${title}"`);
    disableEditing();
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} onSubmit={handleSubmit} className="flex-1 px-[2px]">
          <input
            ref={inputRef}
            id="title"
            name="title"
            placeholder="Enter list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={onBlur}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button hidden type="submit" />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent cursor-pointer"
        >
          {data.title}
        </div>
      )}
      {isActivities && (
        <Select onValueChange={handleThemeChange} defaultValue={selectedTheme}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(activitiesThemes).map(([theme]) => (
              <SelectGroup key={theme}>
                <SelectItem key={theme} value={theme}>
                  {theme}
                </SelectItem>
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      )}
      <ListOptions
        onAddCard={onAddCard}
        data={data}
        onDeleteList={() =>
          toast.info(`Delete logic here for list "${data.title}"`)
        }
        onCopyList={() =>
          toast.info(`Copy logic here for list "${data.title}"`)
        }
      />
    </div>
  );
};

export default ListHeader;
