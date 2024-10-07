import useFetchStartups from "../../hooks/useFetchStartups";
import styles from "./StartupDetailHeader.module.css";
import { useState } from "react";
import noImageIcon from "../../assets/no-image.png";

const MAX_ITEMS = 1;

export default function StartupDetailHeader() {
  const maxItems = MAX_ITEMS;

  const { startups } = useFetchStartups(
    1,
    maxItems,
    "total_investment",
    "desc"
  );

  return startups.map((startup, index) => (
    <tr key={startup.id}>
      <td style={{ textAlign: "left" }}>
        <span style={{ display: "inline-block", verticalAlign: "middle" }}>
          <img
            src={startup.image || noImageIcon}
            alt={startup.name + " 로고"}
            style={{
              width: "8rem",
              height: "8rem",
              marginRight: "0.8rem",
              verticalAlign: "middle",
              borderRadius: "50%",
              backgroundColor: "white",
              objectFit: "cover",
            }}
          />
        </span>
        <span
          style={{
            fontSize: "2.4rem",
          }}
        >
          {startup.name}
        </span>
        <span
          style={{
            fontSize: "2rem",
            color: "#747474",
          }}
        >
          {startup.categoryName}
        </span>
      </td>
    </tr>
  ));
}
