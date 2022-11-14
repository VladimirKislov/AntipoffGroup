import React, { useEffect, useState } from "react";
import styles from "./usercard.css";
import { useParams } from "react-router-dom";
import { Email, Phone } from "../../icons";
import { useSelector } from "react-redux";
import { RootState } from "../../stor/stor";

export function UserCard() {
  

  const { userId } = useParams();
  const dataUsers = useSelector<RootState, any>((state) => state.data.data);
  const [user, setUser] = useState<any>([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (dataUsers.length > 0) {
      setUser(user.concat(dataUsers.find((item: any) => item.id === Number(userId))));
      setIsLoad(true);
    }
  }, [dataUsers]);

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <p>
          Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов,
          включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он
          помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения
          новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.
        </p>
        <p>
          {" "}
          <br />В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с
          трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов —
          это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности,
          уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше
          развиваться самостоятельно".
        </p>
        <p>
          {" "}
          <br />
          Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную
          предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в
          Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.
        </p>
      </div>
      <div className={styles.info}>
        <div className={styles.infoWrapperPhone}>
          <Phone />
          <span className={styles.phone}>+7 (954) 333-44-55</span>
        </div>
        <div className={styles.infoWrapperEmail}>
          <Email />
          {isLoad && <span className={styles.email}>{user[0].email}</span>}
        </div>
        {/* <form action="#">
          <input type="file" onChange={(e: any) => setImageUpload(e.target.files[0])} />
          <button type="submit" onClick={(e) => uploadFile(e)}>
            Send
          </button>
        </form> */}
      </div>
    </div>
  );
}
