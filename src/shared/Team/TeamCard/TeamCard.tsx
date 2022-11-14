import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Like, LikeActive } from "../../../icons";
import styles from "./teamcard.css";

interface itemProps {
  avatar: string;
  email: string;
  first: string;
  last: string;
  id: number;
}

export function TeamCard(item: itemProps) {
  const [isLike, setIsLike] = useState(localStorage.getItem(`userLikeId=${item.id}`) || "false");
  const navigate = useNavigate();

  useEffect(() => {
    const likeId = localStorage.getItem(`userLikeId=${item.id}`);
    if (!likeId) {
      localStorage.setItem(`userLikeId=${item.id}`, "false");
    }
  }, [isLike]);

  const HandleClickUser = (item: any) => {
    navigate(`/user${item.id}`, { state: item });
  };

  function HandleClickLike() {
    if (isLike === "false") {
      setIsLike("true");
      localStorage.setItem(`userLikeId=${item.id}`, "true");
    } else {
      setIsLike("false");
      localStorage.setItem(`userLikeId=${item.id}`, "false");
    }
  }
  
  return (
    <div className={styles.card} data-id={item.id}>
      <a href="#" className={styles.linkAvatar} onClick={() => HandleClickUser(item)}>
        <img className={styles.cardAvatar} src={`${item.avatar}`} alt="avatar" />
      </a>
      <div className={styles.cardFullName}>{`${item.first} ${item.last}`}</div>
      <div className={styles.cardLike} onClick={() => HandleClickLike()}>
        {isLike === 'false' ? <Like /> : <LikeActive />}
      </div>
    </div>
  );
}
